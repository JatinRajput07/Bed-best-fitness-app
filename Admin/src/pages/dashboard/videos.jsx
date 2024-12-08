import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "@/redux/videoSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CategoryVideos from "./CategoryVideos";

export function Videos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const { videos, loading, error } = useSelector((state) => state.videos);

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const renderMediaPreview = (path) => {
        const fileExtension = path.split('.').pop().toLowerCase();

        if (fileExtension === "mp4") {
            return (
                <video className="w-full h-48 object-cover rounded-t-lg" src={path} type="video/mp4" controls>
                    Your browser does not support the video tag.
                </video>
            );
        } else if (fileExtension === "mp3" || fileExtension === "wav") {
            return (
                <audio className="w-full h-48 object-cover rounded-t-lg" controls>
                    <source src={path} type={`audio/${fileExtension}`} />
                    Your browser does not support the audio element.
                </audio>
            );
        } else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif") {
            return (
                <img className="w-full h-48 object-cover rounded-t-lg" src={path} alt="media preview" />
            );
        } else {
            return null;
        }
    };

    const handleViewAll = (category) => {
        setSelectedCategory(category);
      };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            {selectedCategory ? (
                <CategoryVideos category_name={selectedCategory} />
            ) : (<Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Videos And Other Files
                    </Typography>
                </CardHeader>
                <CardBody className="p-4">
                    {Object.keys(videos).map((category) => {                        
                        const categoryVideos = videos[category];
                        return (
                            <div key={category} className="px-4 mt-8 pb-4">
                                <div className="flex justify-between items-center">
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {category.replace(/-/g, " ").toUpperCase()}
                                    </Typography>
                                    <Button
                                        size="sm"
                                        variant="text"
                                        color="blue"
                                        onClick={() => handleViewAll(category)}
                                    >
                                        View All
                                    </Button>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                                    {categoryVideos?.map((media) => (  // Display up to 4 items per category
                                        <Card key={media._id || media.title} className="shadow-lg rounded-lg">
                                            {/* CardHeader for each media item with its preview */}
                                            <CardHeader
                                                floated={false}
                                                color="gray"
                                                className="mx-0 mt-0 mb-4 h-48 xl:h-40"
                                            >
                                                {renderMediaPreview(media.path)} {/* Render media preview based on type */}
                                            </CardHeader>

                                            <CardBody className="p-4 bg-white">
                                                <Typography variant="h6" className="text-sm mb-2 font-semibold">
                                                    {media.title}
                                                </Typography>
                                                {/* {media.subcategories && (
                                                    <Typography variant="small" className="text-gray-600">
                                                        {media.subcategories.join(", ")}
                                                    </Typography>
                                                )} */}
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </CardBody>
            </Card>
            )}
        </div>
    );
}

export default Videos;

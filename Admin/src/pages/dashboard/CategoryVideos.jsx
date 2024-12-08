import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Tab,
    Tabs,
} from "@material-tailwind/react";
import axios from "axios";

const CategoryVideos = ({ category_name }) => {

    const { category } = useParams();
    const [categoryData, setCategoryData] = useState({});
    const [selectedTab, setSelectedTab] = useState("All");
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:7200/admin/video-list-byCategory/${category_name}`)
            .then((response) => {
                if (response.data.status === "success") {
                    setCategoryData(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching video data:", error);
            });
    }, [category_name]);

    useEffect(() => {
        if (selectedTab === "All") {
            setFilteredVideos(Object.values(categoryData).flat());
        } else {
            const videosForTab = categoryData[selectedTab] || [];
            setFilteredVideos(videosForTab);
        }
    }, [selectedTab, categoryData]);

    const subcategories = [
        "All",
        ...new Set(Object.keys(categoryData))
    ];

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

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        {category_name.replace(/-/g, " ").toUpperCase()}
                    </Typography>
                </CardHeader>
                <CardBody className="p-4">

                    <Tabs
                        value={selectedTab}
                        onChange={setSelectedTab}
                        aria-label="Subcategories"
                        className="mb-6 flex gap-4 overflow-x-auto"
                    >
                        {subcategories.map((subcategory) => (
                            <Tab
                                key={subcategory}
                                value={subcategory}
                                className={`px-2 py-2 rounded-full cursor-pointer
                                     ${selectedTab === subcategory
                                        ? "bg-indigo-800"
                                        : "bg-indigo-500 text-white"}`}
                            >
                                <span className="text-sm">{subcategory}</span>
                            </Tab>
                        ))}
                    </Tabs>

                    {filteredVideos.length > 0 ? (
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                            {filteredVideos.map((media) => (
                                <Card key={media._id || media.title} className="shadow-lg rounded-lg">
                                    <CardHeader
                                        floated={false}
                                        color="gray"
                                        className="mx-0 mt-0 mb-4 h-48 xl:h-40"
                                    >
                                        {renderMediaPreview(media.path)}
                                    </CardHeader>

                                    <CardBody className="p-4 bg-white">
                                        <Typography variant="h6" className="text-sm mb-2 font-semibold">
                                            {media.title}
                                        </Typography>
                                        {media.subcategories && (
                                            <Typography variant="small" className="text-gray-600">
                                                {media.subcategories.join(", ")}
                                            </Typography>
                                        )}
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Typography variant="small" color="gray" className="text-center mt-4">
                            No data found for this subcategory.
                        </Typography>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default CategoryVideos;

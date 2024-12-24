import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Tab,
    Tabs,
    IconButton,
    Dialog,
    DialogBody,
    DialogFooter,
    Button,
    Checkbox,
} from "@material-tailwind/react";
import axios from "axios";
import { TrashIcon, StarIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/redux/videoSlice";

const CategoryVideos = ({ category_name, onGoBack }) => {
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState({});
    const [selectedTab, setSelectedTab] = useState("All");
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [recommendationDialogOpen, setRecommendationDialogOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { users, loading: userLoading, error: userError } = useSelector((state) => state.users);

    useEffect(() => {
        axios
            .get(`http://43.204.2.84:7200/admin/video-list-byCategory/${category_name}`)
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
        // Update the filteredVideos when the selectedTab changes
        if (selectedTab === "All") {
            setFilteredVideos(Object.values(categoryData).flat());
        } else {
            // console.log(categoryData, '======categoryData===');
            // console.log(selectedTab, '====selectedTab=====');
            const videosForTab = categoryData[selectedTab] || [];
            setFilteredVideos(videosForTab);
        }
    }, [selectedTab, categoryData]);

    const subcategories = [
        "All",
        ...new Set(Object.keys(categoryData)) // Get unique keys from categoryData
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

   

    const handleDeleteVideo = (videoId) => {

        // console.log(videoId, '====videoId===')
        axios
            .delete(`http://43.204.2.84:7200/admin/video-list/${videoId}`)
            .then(() => {
                toast.success("Video deleted successfully!");
                dispatch(fetchVideos());
                // Update the category data after deletion
                setCategoryData((prevData) => {
                    const updatedData = { ...prevData };
                    Object.keys(updatedData).forEach((key) => {
                        updatedData[key] = updatedData[key].filter((video) => video._id !== videoId);
                    });
                    return updatedData;
                });
            })
            .catch((err) => console.log(err,"d=f=ff=ff=fff"));
    };

    const handleRecommendVideo = () => {
        const recommendationPromises = selectedUsers.map((userId) =>
            axios.post(`http://43.204.2.84:7200/api/recommendation`, {
                videoId: selectedVideo,
                userId,
            })
        );

        Promise.all(recommendationPromises)
            .then(() => {
                toast.success("Video recommended successfully!");
                setRecommendationDialogOpen(false);
                setSelectedUsers([]);
            })
            .catch(() => toast.error("Error recommending video."));
    };

    const handleToggleUserSelection = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const renderUsers = () =>
        users
            .filter((user) => user.role === "user")
            .map((user) => (
                <div key={user._id} className="flex items-center gap-2">
                    <Checkbox
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleToggleUserSelection(user._id)}
                    />
                    <Typography variant="small" color="blue-gray">
                        {user.name}
                    </Typography>
                </div>
            ));

    const isRecommendedCategory = (category) =>
        ["workout-video", "recipe-video", "knowledge-video", "story-podcast-recognition-video"].includes(category);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 relative flex items-center justify-center">
                    <ArrowLeftIcon
                        onClick={onGoBack}
                        className="absolute left-4 h-6 w-6 text-white cursor-pointer"
                    />
                    <Typography variant="h6" color="white" className="text-center">
                        {category_name.replace(/-/g, " ").toUpperCase()}
                    </Typography>
                </CardHeader>
                <CardBody className="p-4">

                    {/* <Tabs
                        value={selectedTab}
                        onChange={(newTab) => {
                            console.log('Tab clicked:', newTab);
                            setSelectedTab(newTab); // This updates the selectedTab state
                        }}
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
                    </Tabs> */}

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
                                        <div className="flex justify-between items-center mt-4">
                                            <IconButton
                                                style={{
                                                    height: "25px",
                                                    width: "25px"
                                                }}
                                                color="red"
                                                onClick={() => handleDeleteVideo(media.id)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </IconButton>
                                            {isRecommendedCategory(category_name) && (
                                                <IconButton
                                                    color="yellow"
                                                    onClick={() => {
                                                        setSelectedVideo(media._id);
                                                        setRecommendationDialogOpen(true);
                                                    }}
                                                >
                                                    <StarIcon className="h-5 w-5" />
                                                </IconButton>
                                            )}
                                        </div>
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

            {/* Recommendation Dialog */}
            <Dialog open={recommendationDialogOpen} handler={() => setRecommendationDialogOpen(false)}>
                <DialogBody className="max-h-96 overflow-y-auto">
                    <Typography variant="h6" className="mb-4">
                        Recommend Video to Users
                    </Typography>
                    {renderUsers()}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={() => setRecommendationDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleRecommendVideo}>
                        Recommend
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default CategoryVideos;

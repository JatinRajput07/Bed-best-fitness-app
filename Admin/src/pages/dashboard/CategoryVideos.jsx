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
import Axios from "@/configs/Axios";

const CategoryVideos = ({ category_name, onGoBack }) => {
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState({});
    const [selectedTab, setSelectedTab] = useState("All");
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [recommendationDialogOpen, setRecommendationDialogOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { users, loading: userLoading, error: userError } = useSelector((state) => state.users);
    const { role } = useSelector((state) => state.auth);

    useEffect(() => {
        Axios
            .get(`/admin/video-list-byCategory/${category_name}`)
            .then((response) => {
                if (response.data.status === "success") {
                    console.log(response.data.data, '==========response.data.data========')
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
        ...new Set(Object.keys(categoryData))
    ];

    const renderMediaPreview = (file) => {
        console.log(file, '=====d=d==f==f=f=f=f=f=f=f=f=f=')
        const { filetype, path, thumbnail, audioThumbnail } = file; // Assuming 'thumbnail' and 'audioThumbnail' are available

        if (filetype === "video") {
            return (
                <div className="w-full h-48 relative">
                    <img
                        src={thumbnail || 'http://43.204.2.84:7200/uploads/images/1735548006312-film-596009_640.jpg'} // Default video thumbnail if not available
                        alt="video thumbnail"
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <video className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg opacity-0 hover:opacity-100 transition-opacity duration-200" src={path} controls>
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        } else if (filetype === "audio") {
            return (
                <div className="w-full h-48 relative">
                    <img
                        src={audioThumbnail || 'http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg'}
                        alt="audio thumbnail"
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <audio className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200" controls>
                        <source src={path} type={`audio/${fileExtension}`} />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            );
        } else if (filetype === "image") {
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
            .catch((err) => console.log(err, "d=f=ff=ff=fff"));
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
        ["Workout Video", "Recipe Video", "Knowledge Video", "Story/Podcast/Recognition"].includes(category);

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
                                <Card key={media._id} className="shadow-lg rounded-lg relative">
                                    {console.log(media, "=====media====")}
                                    <CardHeader floated={false} className="mx-0 mt-0 mb-4 h-48">
                                        {renderMediaPreview(media)}
                                    </CardHeader>
                                    <CardBody className="pb-16"> {/* Added padding to prevent overlap */}
                                        <Typography variant="h6" className="text-sm mb-1">
                                            {media.title}
                                        </Typography>
                                        <Typography variant="small" color="gray" className="mb-2">
                                            {media.description || "No description available."}
                                        </Typography>
                                    </CardBody>
                                    <div className="absolute bottom-10 left-0 right-0 flex justify-between items-center px-4">
                                        {isRecommendedCategory(category_name) && (
                                            <button
                                                onClick={() => {
                                                    setSelectedVideo(media?.id);
                                                    setRecommendationDialogOpen(true);
                                                }}
                                                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                Assign to User
                                            </button>
                                        )}
                                        {role === "admin" && (
                                            <IconButton
                                                style={{
                                                    height: "25px",
                                                    width: "25px",
                                                }}
                                                color="red"
                                                onClick={() => handleDeleteVideo(media.id)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </IconButton>
                                        )}
                                    </div>
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

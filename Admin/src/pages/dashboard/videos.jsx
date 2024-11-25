import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "@/redux/videoSlice";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Videos = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { videos, loading, error } = useSelector((state) => state.videos);
    const [selectedCategory, setSelectedCategory] = useState("workout-video");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const categories = [
        "workout-video",
        "recipe-video",
        "knowledge-video",
        "story-podcast-recognition-video",
    ];

    useEffect(() => {
        // Fetch videos when the component mounts or the selected category changes
        dispatch(fetchVideos(selectedCategory));
    }, [dispatch, selectedCategory]);

    // Filter videos based on selected category
    const filteredVideos = videos.filter(
        (video) => video.category === selectedCategory
    );

    const handleTabChange = (category) => {
        // Update the selected category and fetch videos for that category
        setSelectedCategory(category);
    };

    const handleVideoClick = (video) => {
        // Open the modal and set the selected video
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        // Close the modal
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue-gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Videos by Category
                    </Typography>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <div className="flex">
                        <button
                            onClick={() => navigate("/dashboard/video-upload")} // Use navigate function for redirection
                            className="bg-blue-500 hover:bg-blue-600 font-medium ml-auto mr-12 px-4 py-2 rounded text-white"
                        >
                            Add Video
                        </button>
                    </div>

                    {/* Tabs for category selection */}
                    <div className="mb-4 flex gap-4 ml-5">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleTabChange(category)}
                                className={`px-4 py-2 rounded-lg ${selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {category.replace(/-/g, " ").toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <Typography variant="h6" color="blue-gray">
                            Loading videos...
                        </Typography>
                    ) : error ? (
                        <div className="flex justify-center items-center mt-8 mb-8 w-full">
                            <Typography variant="h6" color="red">
                                {error}
                            </Typography>
                        </div>
                    ) : filteredVideos.length > 0 ? (
                        <div>
                            <table className="w-full min-w-[640px] table-auto mb-6">
                                <thead>
                                    <tr>
                                        {["Video", "Title", "Category", "Subcategories"].map((el) => (
                                            <th
                                                key={el}
                                                className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                >
                                                    {el}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredVideos.map((video, index) => (
                                        <tr
                                            key={video._id || index}
                                            className="cursor-pointer"
                                            onClick={() => handleVideoClick(video)}
                                        >

                                            <td className="border-b border-blue-gray-50 w-1/3 py-3 px-5">
                                                <video
                                                    className="w-full h-auto"
                                                    src={video.path}
                                                    type="video/mp4"
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5">
                                                <Typography className="text-sm text-blue-gray-800">
                                                    {video.title}
                                                </Typography>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5">
                                                <Typography className="text-sm text-blue-gray-800">
                                                    {video.category.replace(/-/g, " ").toUpperCase()}
                                                </Typography>
                                            </td>
                                            <td className="border-b border-blue-gray-50 py-3 px-5">
                                                <Typography className="text-sm text-blue-gray-800">
                                                    {video.subcategories}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center mt-8 mb-8 w-full">
                            <Typography variant="h6" color="blue-gray">
                                No videos found in this category.
                            </Typography>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Modal to show the video */}
            {isModalOpen && selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl mb-4">{selectedVideo.title}</h2>
                        <video
                            controls
                            className="w-full h-auto"
                            src={selectedVideo.path}
                            type="video/mp4"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;

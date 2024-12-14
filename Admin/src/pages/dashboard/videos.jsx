import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "@/redux/videoSlice";
import { fetchUsers } from "@/redux/userSlice";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { TrashIcon, StarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import CategoryVideos from "./CategoryVideos";

export function Videos() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [recommendationDialogOpen, setRecommendationDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { videos, loading: videoLoading, error: videoError } = useSelector((state) => state.videos);
  const { users, loading: userLoading, error: userError } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchUsers({}));
  }, [dispatch]);

  if (videoLoading || userLoading) return <div>Loading...</div>;
  if (videoError || userError) return <div>Error: {videoError || userError}</div>;

  const handleDeleteVideo = (videoId) => {
    axios
      .delete(`http://43.204.2.84:7200/api/videos/${videoId}`)
      .then(() => {
        toast.success("Video deleted successfully!");
        dispatch(fetchVideos());
      })
      .catch(() => toast.error("Error deleting video."));
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

  const renderMediaPreview = (file) => {
    const { filetype, path } = file;

    switch (filetype) {
      case "video":
        return <video src={path} controls className="w-full h-48 object-cover rounded-t-lg" />;
      case "audio":
        return (
          <audio controls className="w-full h-48 object-cover rounded-t-lg">
            <source src={path} />
          </audio>
        );
      case "image":
        return <img src={path} alt="media" className="w-full h-48 object-cover rounded-t-lg" />;
      case "pdf":
        return (
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg"
          >
            <Typography variant="small" color="blue">
              View PDF
            </Typography>
          </a>
        );
      default:
        return (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-lg">
            <Typography variant="small" color="red">
              Unsupported file type
            </Typography>
          </div>
        );
    }
  };

  const handleViewAll = (category) => setSelectedCategory(category);

  const isRecommendedCategory = (category) =>
    ["workout-video", "recipe-video", "knowledge-video", "story-podcast-recognition-video"].includes(category);

  const handleGoBack = () => setSelectedCategory(null);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {selectedCategory ? (
        <CategoryVideos category_name={selectedCategory} onGoBack={handleGoBack} />
      ) : (
        <Card>
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
                    <Typography variant="h6" color="blue-gray">
                      {category.replace(/-/g, " ").toUpperCase()}
                    </Typography>
                    <Button size="sm" variant="text" color="blue" onClick={() => handleViewAll(category)}>
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-8 mt-6 md:grid-cols-2 xl:grid-cols-4">
                    {categoryVideos.map((media) => (
                      <Card key={media._id} className="shadow-lg rounded-lg">
                        <CardHeader floated={false} className="mx-0 mt-0 mb-4 h-48">
                          {renderMediaPreview(media)}
                        </CardHeader>
                        <CardBody>
                          <Typography variant="h6" className="text-sm mb-1">
                            {media.title}
                          </Typography>
                          <Typography variant="small" color="gray" className="mb-2">
                            {media.description || "No description available."}
                          </Typography>
                          <div className="flex justify-between items-center">
                            {isRecommendedCategory(category) && (
                              <button onClick={() => {
                                setSelectedVideo(media?.id);
                                setRecommendationDialogOpen(true);
                              }} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                              >
                                 Asign to User
                              </button>

                            )}
                          </div>
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
          <Button variant="gradient" color="green" onClick={handleRecommendVideo}>
            Recommend
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Videos;

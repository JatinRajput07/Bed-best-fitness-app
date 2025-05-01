import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { TrashIcon, CalendarDaysIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlayIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import Axios from "@/configs/Axios";
import { toast } from "react-hot-toast";

export function RecommendedVideos() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    recommendationId: null,
    videoData: null
  });
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = () => {
    Axios.get("/admin/recommendations")
      .then((response) => {
        setRecommendations(response?.data?.recommendations);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching recommendations");
        setLoading(false);
      });
  };

  const handleRemoveRecommendation = (recommendationId) => {
    Axios.delete(`/admin/video-recommendation/${recommendationId}`)
      .then(() => {
        toast.success("Recommendation removed successfully!");
        fetchRecommendations();
        setDeleteDialog({ open: false, recommendationId: null, videoData: null });
      })
      .catch(() => toast.error("Error removing recommendation"));
  };

  const openDeleteDialog = (recommendationId, videoData) => {
    setDeleteDialog({ 
      open: true, 
      recommendationId,
      videoData 
    });
  };

  const handleVideoHover = (videoId, isHovering) => {
    setHoveredVideo(isHovering ? videoId : null);
    const videoRef = videoRefs.current[videoId];
    if (videoRef) {
      if (isHovering) {
        videoRef.currentTime = 0;
        videoRef.play().catch(e => console.log("Video play error:", e));
      } else {
        videoRef.pause();
      }
    }
  };

  const handleVideoClick = (e, videoId) => {
    e.preventDefault();
    const videoRef = videoRefs.current[videoId];
    
    if (videoRef) {
      if (playingVideo === videoId) {
        if (videoRef.paused) {
          videoRef.play();
        } else {
          videoRef.pause();
        }
      } else {
        // Pause previous video if any
        if (playingVideo && videoRefs.current[playingVideo]) {
          videoRefs.current[playingVideo].pause();
        }
        videoRef.currentTime = 0;
        videoRef.play();
        setPlayingVideo(videoId);
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="shadow-lg">
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Recommended Videos List
            </Typography>
            <Chip
              value={`Total: ${recommendations?.length || 0}`}
              className="bg-white/20 text-white"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-4 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User Info", "Video Preview", "Video Details", "Date", "Actions"].map((head) => (
                  <th key={head} className="border-b border-blue-gray-50 py-3 px-4 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recommendations?.map((recommendation, index) => (
                <tr key={recommendation._id} className={index % 2 === 0 ? "bg-blue-gray-50/50" : ""}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                    {recommendation?.user_id?.profilePicture ? (
      <img
        src={recommendation.user_id.profilePicture}
        alt={recommendation.user_id.name}
        className="h-10 w-10 rounded-full object-cover"
      />
    ) : (
      <UserCircleIcon className="h-10 w-10 text-blue-gray-400" />
    )}
                      <div>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {recommendation?.user_id?.name}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {recommendation?.user_id?.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div 
                      className="w-40 h-24 rounded-lg overflow-hidden shadow-md relative group cursor-pointer"
                      onMouseEnter={() => handleVideoHover(recommendation._id, true)}
                      onMouseLeave={() => handleVideoHover(recommendation._id, false)}
                      onClick={(e) => recommendation?.video_id?.filetype === "video" && handleVideoClick(e, recommendation._id)}
                    >
                      {recommendation?.video_id?.filetype === "video" && (
                        <>
                          {hoveredVideo === recommendation._id || playingVideo === recommendation._id ? (
                            <video
                              ref={el => videoRefs.current[recommendation._id] = el}
                              src={recommendation?.video_id?.path}
                              className="w-full h-full object-cover"
                              muted={hoveredVideo === recommendation._id}
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              src={recommendation?.video_id?.thumbnail}
                              alt="video thumbnail"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className={`absolute inset-0 flex items-center justify-center 
                            ${playingVideo === recommendation._id ? 'bg-black/10' : 
                              hoveredVideo === recommendation._id ? 'bg-black/20' : 'bg-black/30 opacity-0 group-hover:opacity-100'} 
                            transition-all duration-300`}>
                            <PlayIcon className="h-10 w-10 text-white/90 hover:text-white transition-colors" />
                          </div>
                        </>
                      )}
                      {recommendation?.video_id?.filetype === "audio" && (
                        <>
                          <img
                            src={recommendation?.video_id?.audioThumbnail || 'http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg'}
                            alt="audio thumbnail"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <MusicalNoteIcon className="h-10 w-10 text-white/90 hover:text-white transition-colors" />
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      {recommendation?.video_id?.title}
                    </Typography>
                    <Typography variant="small" className="text-xs text-blue-gray-500 mt-1 line-clamp-2">
                      {recommendation?.video_id?.description}
                    </Typography>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-5 w-5 text-blue-gray-400" />
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {new Date(recommendation?.recommended_at).toLocaleDateString()}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Tooltip content="Remove recommendation">
                      <Button
                        color="red"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => openDeleteDialog(recommendation._id, recommendation.video_id)}
                      >
                        <TrashIcon className="h-4 w-4" /> Remove
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      
      <Dialog 
        open={deleteDialog.open} 
        handler={() => setDeleteDialog({ open: false, recommendationId: null, videoData: null })}
        size="md"
        className="rounded-lg"
      >
        <DialogHeader className="flex justify-between items-center border-b pb-2">
          <Typography variant="h5" color="blue-gray">
            Confirm Deletion
          </Typography>
          <IconButton
            color="blue-gray"
            variant="text"
            onClick={() => setDeleteDialog({ open: false, recommendationId: null, videoData: null })}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-6">
          <div className="flex flex-col items-center gap-6">
            {deleteDialog.videoData?.filetype === "video" && (
              <div className="w-full h-48 rounded-lg overflow-hidden relative">
                <video
                  src={deleteDialog.videoData?.path}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayIcon className="h-12 w-12 text-white" />
                </div>
              </div>
            )}
            {deleteDialog.videoData?.filetype === "audio" && (
              <div className="w-full h-48 rounded-lg overflow-hidden relative">
                <img
                  src={deleteDialog.videoData?.audioThumbnail || 'http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg'}
                  alt="audio thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <MusicalNoteIcon className="h-12 w-12 text-white" />
                </div>
              </div>
            )}
            
            <div className="text-center">
              <Typography variant="h5" color="red" className="mb-2">
                Delete this recommendation?
              </Typography>
              <Typography className="text-gray-600">
                Are you sure remove this video from recommendations.
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="border-t pt-4">
          <div className="flex justify-end gap-3">
            <Button
              variant="text"
              color="gray"
              onClick={() => setDeleteDialog({ open: false, recommendationId: null, videoData: null })}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleRemoveRecommendation(deleteDialog.recommendationId)}
              className="flex items-center gap-2"
            >
              <TrashIcon className="h-4 w-4" /> Confirm Delete
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default RecommendedVideos;
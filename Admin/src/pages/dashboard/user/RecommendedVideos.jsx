import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

function RecommendedVideos({ userId }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://43.204.2.84:7200/admin/getUserRecomenedVideo/${userId}`
        );
        if (response.data.status === "success") {
          setVideos(response.data.data);
        } else {
          setError("Failed to fetch videos. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <Typography variant="h6" color="red">
          {error}
        </Typography>
      </div>
    );

  if (videos.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <Typography variant="h6" color="blue-gray">
          No recommended videos available.
        </Typography>
      </div>
    );

  return (
    <div className="px-4 mt-8 pb-4">
      <Typography variant="h6" color="blue-gray" className="mb-2">
        Recommended Videos
      </Typography>
      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
        {videos.map(({ video_id }, key) => (
          video_id && (
          <Card
            key={video_id?._id}
            color="transparent"
            shadow={false}
            className="cursor-pointer"
            onClick={() => setSelectedVideo(video_id?.path)}
          >
            <CardHeader
              floated={false}
              color="gray"
              className="mx-0 mt-0 mb-4 h-64 xl:h-40"
            >
              <img
                src={video_id?.thumbnail ? video_id?.thumbnail : `https://via.placeholder.com/300x200.png?text=Thumbnail`}
                alt={video_id?.title}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <Typography variant="subtitle1" className="text-center mt-2">
              {video_id?.title}
            </Typography>
          </Card>
           )
        ))}
      </div>

      {/* Modal for Video Preview */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-3/4 lg:w-1/2 relative">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Video Player</Typography>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <video
              src={selectedVideo}
              controls
              className="w-full h-96"
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendedVideos;

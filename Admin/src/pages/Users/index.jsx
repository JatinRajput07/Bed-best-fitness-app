import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "@/redux/videoSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";

const Videos = () => {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.videos);

  console.log(videos,'==d==d=dvideos')
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  // Helper function to group videos by category
  const groupVideosByCategory = (videos) => {
    return videos.reduce((acc, video) => {
      if (!acc[video.category]) {
        acc[video.category] = [];
      }
      acc[video.category].push(video);
      return acc;
    }, {});
  };

  const groupedVideos = groupVideosByCategory(videos);

  // Get categories from groupedVideos or use "all" if no categories
  const categories = ["all", ...Object.keys(groupedVideos)];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
          {/* Tabs for category selection */}
          <div className="mb-6 flex gap-4 border-b border-blue-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-t-lg ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <Typography variant="h6" color="blue-gray">
              Loading videos...
            </Typography>
          ) : error ? (
            <Typography variant="h6" color="red">
              {error}
            </Typography>
          ) : (
            <div>
              {/* Display videos based on selected category */}
              {selectedCategory === "all" || groupedVideos[selectedCategory] ? (
                <div>
                  <Typography variant="h5" className="text-blue-gray-800 mb-4">
                    {selectedCategory === "all"
                      ? "All Videos"
                      : selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)}
                  </Typography>
                  <table className="w-full min-w-[640px] table-auto mb-6">
                    <thead>
                      <tr>
                        {["Title", "Duration", "UnderAge (16+)", "Type"].map(
                          (el) => (
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
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedCategory === "all"
                        ? videos
                        : groupedVideos[selectedCategory]
                      ).map((video, index) => (
                        <tr key={video.id || index}>
                          <td className="border-b border-blue-gray-50 py-3 px-5">
                            <Typography className="text-sm text-blue-gray-800">
                              {video.title}
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-5">
                            <Typography className="text-sm text-blue-gray-800">
                              {Math.floor(video.duration / 60)}:
                              {String(video.duration % 60).padStart(2, "0")} mins
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-5">
                            <Chip
                              variant="gradient"
                              color={video.underAge ? "red" : "blue-gray"}
                              value={video.underAge ? "Yes" : "No"}
                              className="py-0.5 px-2 text-[11px] font-medium w-fit"
                            />
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-5">
                            <Typography className="text-sm text-blue-gray-800">
                              {video.isSeries ? "Series" : "Movie"}
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Typography variant="h6" color="blue-gray">
                  No videos found in this category.
                </Typography>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Videos;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../redux/videoSlice';
import AdminLayout from '../components/AdminLayout';
import { utilService } from '../utilService';

const categories = [
  'workout-video',
  'recipe-video',
  'knowledge-video',
  'story-podcast-recognition-video',
];

const VideoList = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { videos, loading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos(selectedCategory))
      .unwrap()
      .catch((err) => utilService.showErrorToast(err)); // Show error toast if request fails
  }, [dispatch, selectedCategory]);

  return (
    <AdminLayout title="Video List">
      <div className="p-6 mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Manage Videos</h1>

        {/* Category Tabs */}
        <div className="mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 mr-2 rounded-md ${
                selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              {category.replace(/-/g, ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && <div className="text-center">Loading...</div>}

        {/* Video List */}
        {!loading && videos.length > 0 ? (
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video._id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-4">
                  <video className="w-32 h-32 object-cover" controls>
                    <source src={video.path} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div>
                    <h2 className="text-lg font-semibold">{video.title}</h2>
                    <p className="text-sm text-gray-600">{video.category}</p>
                  </div>
                </div>

                <div className="space-x-2">
                  <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
                    Delete
                  </button>
                  <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="text-center text-gray-600">Data not found for this category.</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default VideoList;

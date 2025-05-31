import React, { useEffect, useState } from "react";
import Axios from "@/configs/Axios";
import { Typography, Spinner, Button } from "@material-tailwind/react";

const Gallery = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0
  });

  const fetchImages = async (page = 1) => {
    try {
      setLoading(true);
      const response = await Axios.get(`/user/get-user-images?userId=${userId}&page=${page}&limit=${pagination.limit}`);
      setImages(response.data.data);
      setPagination({
        ...pagination,
        page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages
      });
    } catch (err) {
      setError("Failed to fetch images");
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchImages(1);
    }
  }, [userId]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchImages(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="red" className="text-center p-4">
        {error}
      </Typography>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={image.path}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              No Images Found
            </Typography>
            <Typography color="gray" className="text-center">
              There are currently no images uploaded for this user.
            </Typography>
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 p-4">
          <Button
            size="sm"
            variant="outlined"
            className="flex items-center gap-2"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {[...Array(pagination.totalPages)].map((_, idx) => (
              <Button
                key={idx + 1}
                size="sm"
                variant={pagination.page === idx + 1 ? "filled" : "text"}
                color={pagination.page === idx + 1 ? "blue" : "gray"}
                className="w-10 h-10"
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outlined"
            className="flex items-center gap-2"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Gallery;

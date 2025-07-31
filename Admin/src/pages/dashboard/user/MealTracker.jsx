import Axios from "@/configs/Axios";
import { formatDate, formatDateTime } from "@/utilService";
import { CornerDownLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DEFAULT_IMAGE_URL = '/img/fb88eeb5.jpg';

const MealTracker = ({ userId, loginUser }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  const recordsPerPage = 5;

  function formatMealName(input) {
    return input
      .trim()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  useEffect(() => {
    const fetchMealsData = async () => {
      try {
        const response = await Axios.get(`/user/getMealsData/${userId}/getMealsData`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching meals data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMealsData();
    }
  }, [userId]);

  const handleCommentSubmit = async (date, mealType) => {
    const comment = commentInputs[`${date}-${mealType}`] || "";
    if (!comment) {
      alert("Please enter a comment!");
      return;
    }

    try {
      const response = await Axios.post(`/user/routine/${userId}/${date}/${mealType}/comment`, {
        text: comment,
        loginUser,
      });
      if (response.status === 200) {
        // Refresh data to get updated comments
        const refreshedResponse = await Axios.get(`/user/getMealsData/${userId}/getMealsData`);
        setData(refreshedResponse.data);
        setCommentInputs({ ...commentInputs, [`${date}-${mealType}`]: "" });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const mealPlan = data?.meals || [];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = mealPlan.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(mealPlan.length / recordsPerPage);

  const toggleDay = (index) => {
    setOpen(open === index ? null : index);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setOpen(null);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setOpen(null);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    const dateIndex = mealPlan.findIndex((day) => day.date === selectedDate);
    if (dateIndex !== -1) {
      const page = Math.floor(dateIndex / recordsPerPage) + 1;
      setCurrentPage(page);
      const relativeIndex = dateIndex - (page - 1) * recordsPerPage;
      setOpen(relativeIndex);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Meal Tracker</h2>

      <div className="mb-6">
        <label htmlFor="meal-date" className="block text-lg font-semibold text-gray-700">
          Select a Date:
        </label>
        <select
          id="meal-date"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          value={selectedDate || ""}
          onChange={handleDateChange}
        >
          <option value="">-- Select a Date --</option>
          {mealPlan.map((day, index) => (
            <option key={index} value={day.date}>
              {formatDate(day.date)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {currentRecords.length > 0 ? (
          currentRecords.map((day, index) => (
            <div key={index} className="border-b">
              <div
                className="cursor-pointer py-4 px-6 bg-gray-100 hover:bg-gray-200"
                onClick={() => toggleDay(index)}
              >
                <h3 className="text-xl font-semibold text-gray-700">{formatDate(day?.date)}</h3>
              </div>

              {open === index && (
                <div className="p-4 space-y-4">
                  {Object.keys(day?.value || {}).length > 0 ? (
                    Object.entries(day?.value).map(([mealType, mealDetails], mealIndex) => (
                      <div
                        key={mealIndex}
                        className="border rounded-lg p-4 flex items-start gap-4 shadow-sm bg-gray-50"
                      >
                        {/* Meal details section (keep this the same) */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                          <img
                            src={mealDetails.image || DEFAULT_IMAGE_URL}
                            alt={mealType}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 capitalize">{formatMealName(mealType)}</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                              className={`font-bold ${mealDetails.status === "take" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                              {mealDetails.status === "take" ? "Taken" : "Skipped"}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Note:</span> {mealDetails.note || "No notes"}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Items:</span>{" "}
                            {mealDetails.items.length > 0 ? mealDetails.items.join(", ") : "No items"}
                          </p>
                          {mealDetails.image && mealDetails.image_uploaded_at && (
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Date :</span>{" "}
                              {formatDateTime(mealDetails.image_uploaded_at)}
                            </p>
                          )}
                        </div>

                        {/* Improved Comment Section */}
                        <div className="w-80 border-l pl-4">
                          <h4 className="text-md font-semibold text-gray-700 mb-3 pb-2 border-b">Comments</h4>

                          {/* Comment List */}
                          <div className="max-h-48 overflow-y-auto pr-2 mb-4 space-y-3">
                            {mealDetails.comments?.length > 0 ? (
                              mealDetails.comments.map((comment, i) => (
                                <div key={i} className="p-3 bg-white rounded-lg shadow-xs border">
                                  <p className="text-sm text-gray-800">{comment.text}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDateTime(comment.created_at)}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 italic">No comments yet</p>
                            )}
                          </div>

                          {/* Comment Input */}
                          <div className="mt-4 border-t pt-3">
                            <div className="relative">
                              <textarea
                                rows="2"
                                className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Write your comment..."
                                value={commentInputs[`${day.date}-${mealType}`] || ""}
                                onChange={(e) =>
                                  setCommentInputs({
                                    ...commentInputs,
                                    [`${day.date}-${mealType}`]: e.target.value,
                                  })
                                }
                              />
                              {/* <button
                                className="absolute right-2 bottom-2 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                onClick={() => handleCommentSubmit(day.date, mealType)}
                                title="Add comment"
                              >
                                <CornerDownLeft size={18} />
                              </button> */}
                            </div>
                            <button
                              className="mt-2 w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                              onClick={() => handleCommentSubmit(day.date, mealType)}
                            >
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Record not found</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No meal data available</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MealTracker;
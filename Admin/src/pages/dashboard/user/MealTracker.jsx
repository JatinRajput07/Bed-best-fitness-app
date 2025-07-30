import Axios from "@/configs/Axios";
import { formatDate, formatDateTime } from "@/utilService";
import React, { useEffect, useState } from "react";

const DEFAULT_IMAGE_URL = '/img/fb88eeb5.jpg';

const MealTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  const recordsPerPage = 5; // Show 5 records per page

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

  const handleCommentSubmit = (date, mealType) => {
    const newComments = { ...comments };
    const comment = commentInputs[`${date}-${mealType}`] || "";
    if (!newComments[`${date}-${mealType}`]) {
      newComments[`${date}-${mealType}`] = [];
    }
    newComments[`${date}-${mealType}`].push(comment);
    setComments(newComments);
    setCommentInputs({ ...commentInputs, [`${date}-${mealType}`]: "" });
  };

  const mealPlan = data?.meals || [];

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = mealPlan.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(mealPlan.length / recordsPerPage);

  const toggleDay = (index) => {
    setOpen(open === index ? null : index);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setOpen(null); // Close expanded day on page change
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setOpen(null); // Close expanded day on page change
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    // Find the index of the selected date in the meal plan
    const dateIndex = mealPlan.findIndex((day) => day.date === selectedDate);
    if (dateIndex !== -1) {
      // Determine which page contains the selected date
      const page = Math.floor(dateIndex / recordsPerPage) + 1; // 0-indexed, so add 1 for page number
      setCurrentPage(page);

      // Calculate the relative index of the selected date in the new page
      const relativeIndex = dateIndex - (page - 1) * recordsPerPage;

      // Open the accordion for the selected date (set open state to the relative index)
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

      {/* Dropdown for selecting date */}
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
                        className="border rounded-lg p-4 flex items-center gap-4 shadow-sm bg-gray-50"
                      >
                        {/* Meal Image */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                          <img
                            src={mealDetails.image || DEFAULT_IMAGE_URL}
                            alt={mealType}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Meal Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 capitalize">{formatMealName(mealType)}</h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                              className={`font-bold ${
                                mealDetails.status === "take" ? "text-green-600" : "text-red-600"
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
                        <div className="mt-4">
                          <h4 className="text-md font-semibold text-gray-700">Comments</h4>
                          <div className="mt-2">
                            <textarea
                              rows="3"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Add a comment..."
                              value={commentInputs[`${day.date}-${mealType}`] || ""}
                              onChange={(e) =>
                                setCommentInputs({
                                  ...commentInputs,
                                  [`${day.date}-${mealType}`]: e.target.value,
                                })
                              }
                            ></textarea>
                            <button
                              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                              onClick={() => handleCommentSubmit(day.date, mealType)}
                            >
                              Add Comment
                            </button>
                          </div>
                          <div className="mt-4">
                            {comments[`${day.date}-${mealType}`] &&
                              comments[`${day.date}-${mealType}`].map((c, i) => (
                                <div key={i} className="p-2 border-b border-gray-200">
                                  {c}
                                </div>
                              ))}
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

      {/* Pagination Controls */}
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
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MealTracker;

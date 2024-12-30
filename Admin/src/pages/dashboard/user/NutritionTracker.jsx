import Axios from "@/configs/Axios";
import React, { useEffect, useState } from "react";

const NutritionTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await Axios.get(`/user/getNutritionData/${userId}/getNutritionData`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNutritionData();
    }
  }, [userId]);

  const nutritionPlan = data?.nutrition || [];

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = nutritionPlan.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(nutritionPlan.length / recordsPerPage);

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

    // Find the index of the selected date in the nutrition plan
    const dateIndex = nutritionPlan.findIndex((day) => day.date === selectedDate);
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Nutrition Tracker</h2>

      {/* Dropdown for selecting date */}
      <div className="mb-6">
        <label htmlFor="nutrition-date" className="block text-lg font-semibold text-gray-700">
          Select a Date:
        </label>
        <select
          id="nutrition-date"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          value={selectedDate || ""}
          onChange={handleDateChange}
        >
          <option value="">-- Select a Date --</option>
          {nutritionPlan.map((day, index) => (
            <option key={index} value={day.date}>
              {day.date}
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
                <h3 className="text-xl font-semibold text-gray-700">{day?.date}</h3>
              </div>

              {open === index && (
                <div className="p-4 space-y-4">
                  {day?.value.length > 0 ? (
                    day?.value.map((nutritionDetail, nutritionIndex) => (
                      <div
                        key={nutritionIndex}
                        className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm bg-gray-50"
                      >
                        {/* Nutrition Details */}
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Dose Time:</span>{" "}
                          {nutritionDetail.mealTime || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Description:</span>{" "}
                          {nutritionDetail.description || "N/A"}
                        </p>
                        {/* <p className="text-sm text-gray-600">
                          <span className="font-semibold">Quantity:</span>{" "}
                          {nutritionDetail.quantity || "N/A"}
                        </p> */}
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Status:</span>{" "}
                          <span
                            className={`font-bold ${
                              nutritionDetail.status === "take"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {nutritionDetail.status === "take" ? "Taken" : "Skipped"}
                          </span>
                        </p>
                        {nutritionDetail.coach?.name && (
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Coach:</span> {nutritionDetail.coach.name}{" "}
                            ({nutritionDetail.coach.email || "N/A"})
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No nutrition data available</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No nutrition data available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
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

export default NutritionTracker;

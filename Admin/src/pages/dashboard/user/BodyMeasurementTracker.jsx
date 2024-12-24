import Axios from "@/configs/Axios";
import React, { useEffect, useState } from "react";

const BodyMeasurementTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchBodyMeasurementData = async () => {
      try {
        const response = await Axios.get(`/user/getBodyMeasurementParameters/${userId}/getBodyMeasurementParameters`);
        setData(response.data.bodyMeasurementParameters || []); // Safely handle the response structure
      } catch (error) {
        console.error("Error fetching body measurement data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBodyMeasurementData();
    }
  }, [userId]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = (data || []).slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil((data || []).length / recordsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
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
    <div className="max-w-6xl mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Body Measurement Tracker</h2>

      <div className="space-y-6 overflow-auto">
        {currentRecords.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Hip</th>
                <th className="border border-gray-300 px-4 py-2">Waist</th>
                <th className="border border-gray-300 px-4 py-2">Right Arm (Flexed)</th>
                <th className="border border-gray-300 px-4 py-2">Left Arm (Flexed)</th>
                <th className="border border-gray-300 px-4 py-2">Right Arm (Unflexed)</th>
                <th className="border border-gray-300 px-4 py-2">Left Arm (Unflexed)</th>
                <th className="border border-gray-300 px-4 py-2">Chest</th>
                <th className="border border-gray-300 px-4 py-2">Thigh</th>
                <th className="border border-gray-300 px-4 py-2">Calf</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((entry, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.hip || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.waist || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.right_arm_flexed || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.left_arm_flexed || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.right_arm_unflexed || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.left_arm_unflexed || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.chest || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.thigh || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.calf || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No body measurement data available</p>
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

export default BodyMeasurementTracker;

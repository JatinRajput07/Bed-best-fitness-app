import Axios from "@/configs/Axios";
import { formatDate } from "@/utilService";
import React, { useEffect, useState } from "react";

const BodyDataTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchBodyData = async () => {
      try {
        const response = await Axios.get(`/user/getBodyData/${userId}/getBodyData`);
        setData(response.data.bodyData || []); // Safely handle the response structure
      } catch (error) {
        console.error("Error fetching body data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBodyData();
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Body Data Tracker</h2>

      <div className="space-y-6 overflow-auto">
        {currentRecords.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Body Fat</th>
                <th className="border border-gray-300 px-4 py-2">BMI</th>
                <th className="border border-gray-300 px-4 py-2">BMR</th>
                <th className="border border-gray-300 px-4 py-2">Bone Mass</th>
                <th className="border border-gray-300 px-4 py-2">Body Hydration</th>
                <th className="border border-gray-300 px-4 py-2">Metabolic Age</th>
                <th className="border border-gray-300 px-4 py-2">Protein</th>
                <th className="border border-gray-300 px-4 py-2">Skeletal Muscle</th>
                <th className="border border-gray-300 px-4 py-2">Subcutaneous Fat</th>
                <th className="border border-gray-300 px-4 py-2">Visceral Fat</th>
                <th className="border border-gray-300 px-4 py-2">Muscle Mass</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((entry, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{formatDate(entry.date)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.body_fat || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.bmi || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.bmr || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.bone_mass || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.body_hydration || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.metabolic_age || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.protein || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.skeletal_muscle || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.subcutaneous_fat || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.visceral_fat || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.muscle_mass || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No body data available</p>
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

export default BodyDataTracker;

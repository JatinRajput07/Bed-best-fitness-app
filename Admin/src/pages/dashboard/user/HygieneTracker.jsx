import Axios from "@/configs/Axios";
import { formatDate } from "@/utilService";
import React, { useEffect, useState } from "react";

const HygieneTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchHygieneData = async () => {
      try {
        const response = await Axios.get(`/user/getHygieneData/${userId}/getHygieneData`);
        setData(response.data.hygiene || []);
      } catch (error) {
        console.error("Error fetching hygiene data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHygieneData();
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Hygiene Tracker</h2>

      <div className="space-y-6 overflow-auto">
        {currentRecords.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Bathing</th>
                <th className="border border-gray-300 px-4 py-2">Hand Wash</th>
                <th className="border border-gray-300 px-4 py-2">Teeth Clean</th>
                <th className="border border-gray-300 px-4 py-2">Nail Cut</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((entry, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{formatDate(entry.date)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.bathing ? "Yes" : entry.value?.bathing === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.hand_wash ? "Yes" : entry.value?.hand_wash === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.teeth_clean ? "Yes" : entry.value?.teeth_clean === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.nail_cut ? "Yes" : entry.value?.nail_cut === false ? "No" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No hygiene data available</p>
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

export default HygieneTracker;

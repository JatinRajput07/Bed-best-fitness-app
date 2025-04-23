import Axios from "@/configs/Axios";
import { formatDate } from "@/utilService";
import React, { useEffect, useState } from "react";

const WhatsNewTodayTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchWhatsNewTodayData = async () => {
      try {
        const response = await Axios.get(
          `/user/getWhatNewToday/${userId}/getWhatNewToday`
        );
        setData(response.data.whatNewToday || []);
      } catch (error) {
        console.error("Error fetching What's New Today data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchWhatsNewTodayData();
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">What's New Today Tracker</h2>

      <div className="space-y-6 overflow-auto">
        {currentRecords.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Learn New Language</th>
                <th className="border border-gray-300 px-4 py-2">Learn Sports Skill</th>
                <th className="border border-gray-300 px-4 py-2">Play Music Today</th>
                <th className="border border-gray-300 px-4 py-2">Travel Fun Today</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((entry, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{formatDate(entry.date)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.learn_new_language ? "Yes" : entry.value?.learn_new_language === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.learn_sports_skill ? "Yes" : entry.value?.learn_sports_skill === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.play_music_today ? "Yes" : entry.value?.play_music_today === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.travel_fun_today ? "Yes" : entry.value?.travel_fun_today === false ? "No" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No data available for What's New Today</p>
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

export default WhatsNewTodayTracker;

import Axios from "@/configs/Axios";
import { formatDate } from "@/utilService";
import React, { useEffect, useState } from "react";

const SleepTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const calculateSleepDuration = (bedTime, wakeTime) => {
    if (!bedTime || !wakeTime) return "-";
    
    const bed = new Date(`2000/01/01 ${bedTime}`);
    const wake = new Date(`2000/01/01 ${wakeTime}`);
    
    if (wake < bed) {
      wake.setDate(wake.getDate() + 1);
    }
    
    const diff = wake - bed;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await Axios.get(`/user/getSleepData/${userId}/getSleepData`);
        setData(response.data.sleep || []); // Safely handle the response structure
      } catch (error) {
        console.error("Error fetching sleep data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSleepData();
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
    <div className="max-w-4xl mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sleep Tracker</h2>

      <div className="space-y-6">
        {currentRecords.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Bed At</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Wake Up</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Sleep</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((sleep, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{formatDate(sleep?.date)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {sleep?.value?.bed_at || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {sleep?.value?.wake_up || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {calculateSleepDuration(sleep?.value?.bed_at, sleep?.value?.wake_up)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No sleep data available</p>
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

export default SleepTracker;

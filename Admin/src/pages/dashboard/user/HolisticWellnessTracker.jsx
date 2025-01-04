import Axios from "@/configs/Axios";
import React, { useEffect, useState } from "react";

const HolisticWellnessTracker = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchHolisticWellnessData = async () => {
      try {
        const response = await Axios.get(
          `/user/getHolisticWellness/${userId}/getHolisticWellness`
        );
        setData(response.data.holisticWellness || []);
      } catch (error) {
        console.error("Error fetching holistic wellness data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHolisticWellnessData();
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Holistic Wellness Tracker</h2>

      <div className="space-y-6 overflow-auto">
        {currentRecords.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Hot Water Wash</th>
                <th className="border border-gray-300 px-4 py-2">Cold Water Wash</th>
                <th className="border border-gray-300 px-4 py-2">Abhyanga</th>
                <th className="border border-gray-300 px-4 py-2">Neti</th>
                <th className="border border-gray-300 px-4 py-2">Palm Rubbing</th>
                <th className="border border-gray-300 px-4 py-2">Foot Massage</th>
                <th className="border border-gray-300 px-4 py-2">Head Massage</th>
                <th className="border border-gray-300 px-4 py-2">Oil Pulling</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((entry, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.hot_water_wash ? "Yes" : entry.value?.hot_water_wash === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.cold_water_wash ? "Yes" : entry.value?.cold_water_wash === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.abhyanga ? "Yes" : entry.value?.abhyanga === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.neti ? "Yes" : entry.value?.neti === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.palm_rubbing ? "Yes" : entry.value?.palm_rubbing === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.foot_massage ? "Yes" : entry.value?.foot_massage === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.head_massage ? "Yes" : entry.value?.head_massage === false ? "No" : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.value?.oil_pulling ? "Yes" : entry.value?.oil_pulling === false ? "No" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No holistic wellness data available</p>
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

export default HolisticWellnessTracker;

import Axios from "@/configs/Axios";
import { formatDate } from "@/utilService";
import React, { useEffect, useState } from "react";

const WaterTracker = ({userId}) => {
  const [data, setData] = useState(null);

  const convertQtyToGlasses = (qty, date) => {
    if (qty && typeof qty === "string") {
      const numericValue = parseFloat(qty.replace(/[^\d.-]/g, ""));
      if (!isNaN(numericValue)) {
        const qtyInMl = numericValue * 1000;
        const glassSize = new Date(date) < new Date('2025-01-27') ? 250 : 200;
        const qtyInGlasses = qtyInMl / glassSize;
        return qtyInGlasses;
      }
    }
    return 0;
  };

  useEffect(() => {
    const fetchStepTracking = async () => {
      try {
        const response = await Axios.get(`/user/getWaterTracking/${userId}/getWaterTracking`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching step tracking data:", error);
      }
    };
    if (userId) {
      fetchStepTracking();
    }
  }, [userId]);

  const waterGoal = data?.dailyGoal; 


  return (
    <div className="max-w-full mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        Water Tracker
      </h2>

      {/* Water Goal */}
      <div className="text-center mb-6">
        <p className="text-gray-600 font-medium">Daily Water Goal</p>
        <p className="text-3xl font-bold text-blue-600">
          {waterGoal} Glasses ({waterGoal * 200}ml)
        </p>
        {data?.waterAchive?.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-600 font-medium">Today's Progress</p>
            {data.waterAchive.find(record => 
              new Date(record.date).toDateString() === new Date().toDateString()
            ) ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-2xl font-bold">
                  {Math.round(convertQtyToGlasses(
                    data.waterAchive.find(record => 
                      new Date(record.date).toDateString() === new Date().toDateString()
                    ).value.qty,
                    new Date()
                  ))} Glasses ({parseFloat(data.waterAchive.find(record => 
                    new Date(record.date).toDateString() === new Date().toDateString()
                  ).value.qty) * 1000}ml)
                </p>
                <span className={`px-3 py-1 rounded-full ${
                  convertQtyToGlasses(
                    data.waterAchive.find(record => 
                      new Date(record.date).toDateString() === new Date().toDateString()
                    ).value.qty,
                    new Date()
                  ) >= waterGoal
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {convertQtyToGlasses(
                    data.waterAchive.find(record => 
                      new Date(record.date).toDateString() === new Date().toDateString()
                    ).value.qty,
                    new Date()
                  ) >= waterGoal
                    ? "Goal Achieved"
                    : "Goal Not Achieved"}
                </span>
              </div>
            ) : (
              <p className="text-xl text-gray-500">No data for today</p>
            )}
          </div>
        )}
      </div>

      {/* Water Intake Records */}
      <div>
        <p className="text-gray-600 font-medium mb-4">Water Intake History</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Glasses Drank
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              { data && data?.waterAchive.length > 0 && data?.waterAchive?.map((record, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {formatDate(record.date)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {Math.round(convertQtyToGlasses(record.value.qty, record.date))} Glass ({parseFloat(record.value.qty) * 1000}ml)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    <span
                      className={`${
                        convertQtyToGlasses(record.value.qty, record.date) >= waterGoal
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {convertQtyToGlasses(record.value.qty) >= waterGoal
                        ? "Goal Achieved"
                        : "Goal Not Achieved"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;

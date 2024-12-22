import React from "react";

const WaterTracker = () => {
  const waterGoal = 8; // Static goal (number of glasses)
  const records = [
    { date: "22/12/2024", glasses: 8 },
    { date: "21/12/2024", glasses: 6 },
    { date: "20/12/2024", glasses: 9 },
    { date: "19/12/2024", glasses: 7 },
  ]; // Static records

  return (
    <div className="max-w-full mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        Water Tracker
      </h2>

      {/* Water Goal */}
      <div className="text-center mb-6">
        <p className="text-gray-600 font-medium">Daily Water Goal</p>
        <p className="text-3xl font-bold text-blue-600">
          {waterGoal} glasses
        </p>
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
              {records.map((record, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {record.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {record.glasses}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    <span
                      className={`${
                        record.glasses >= waterGoal
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.glasses >= waterGoal
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

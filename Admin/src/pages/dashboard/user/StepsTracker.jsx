import React from "react";

const StepsTracker = ({ data }) => {
  const stepGoal = data?.dailyGoal;
  const records = [
    { date: "22/12/2024", steps: 12000, calories: 500, time: "1h 30m" },
    { date: "21/12/2024", steps: 9500, calories: 400, time: "1h 10m" },
    { date: "20/12/2024", steps: 11000, calories: 450, time: "1h 20m" },
    { date: "19/12/2024", steps: 8000, calories: 350, time: "1h 0m" },
  ]; // Static records

  return (
    <div className="max-w-full mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Steps Tracker
      </h2>

      {/* Step Goal */}
      <div className="text-center mb-6">
        <p className="text-gray-600 font-medium">Daily Step Goal</p>
        <p className="text-3xl font-bold text-blue-600">{stepGoal} steps</p>
      </div>

      {/* Steps Records */}
      <div>
        <p className="text-gray-600 font-medium mb-4">Steps History</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Steps
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Calories Burned
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Time Spent
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data?.stepAchive.length > 0 && data?.stepAchive.map((record, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {record.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {record?.value?.steps || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {record?.value?.calories || "N/A"} kcal
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {record?.value?.time || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    <span
                      className={`${record.steps >= stepGoal
                          ? "text-green-600"
                          : "text-red-600"
                        }`}
                    >
                      {record.steps >= stepGoal
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

export default StepsTracker;

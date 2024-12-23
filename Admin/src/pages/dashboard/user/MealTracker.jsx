import React, { useState } from "react";

const MealTracker = () => {
  // Simulating multiple days of meal tracking
  const mealPlan = [
    {
      date: "22/12/2024",
      meals: [
        {
          meal: "Wake-Up Food",
          status: "take",
          note: "Had a light start with warm water and lemon.",
          image: "https://via.placeholder.com/150",
          items: ["Warm Water", "Lemon"],
        },
        {
          meal: "Breakfast",
          status: "take",
          note: "Oats and fruits for a healthy start.",
          image: "https://via.placeholder.com/150",
          items: ["Oatmeal", "Banana", "Almond Milk"],
        },
        {
          meal: "Lunch",
          status: "skip",
          note: "Skipped due to a busy schedule.",
          image: "https://via.placeholder.com/150",
          items: ["Rice", "Dal", "Vegetables"],
        },
        {
          meal: "Dinner",
          status: "take",
          note: "Had a light dinner of soup and salad.",
          image: "https://via.placeholder.com/150",
          items: ["Soup", "Salad"],
        },
      ],
    },
    {
      date: "23/12/2024",
      meals: [
        {
          meal: "Wake-Up Food",
          status: "skip",
          note: "Skipped due to early morning rush.",
          image: "https://via.placeholder.com/150",
          items: ["Warm Water", "Lemon"],
        },
        {
          meal: "Breakfast",
          status: "take",
          note: "Oats with almond milk.",
          image: "https://via.placeholder.com/150",
          items: ["Oatmeal", "Almond Milk"],
        },
        {
          meal: "Lunch",
          status: "take",
          note: "Healthy vegetable stir fry.",
          image: "https://via.placeholder.com/150",
          items: ["Vegetables", "Rice"],
        },
        {
          meal: "Dinner",
          status: "take",
          note: "Had soup and crackers.",
          image: "https://via.placeholder.com/150",
          items: ["Soup", "Crackers"],
        },
      ],
    },
    // Add more days as required
  ];

  // State to manage which day's meal list is expanded
  const [open, setOpen] = useState(null);

  const toggleDay = (index) => {
    if (open === index) {
      setOpen(null); // Close if the same day is clicked
    } else {
      setOpen(index); // Open the selected day
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Meal Tracker</h2>

      <div className="space-y-6">
        {mealPlan.map((day, index) => (
          <div key={index} className="border-b">
            <div
              className="cursor-pointer py-4 px-6 bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleDay(index)}
            >
              <h3 className="text-xl font-semibold text-gray-700">{day.date}</h3>
            </div>

            {/* Accordion Content (Meal Details) */}
            {open === index && (
              <div className="p-4 space-y-4">
                {day.meals.map((meal, mealIndex) => (
                  <div
                    key={mealIndex}
                    className="border rounded-lg p-4 flex items-center gap-4 shadow-sm bg-gray-50"
                  >
                    {/* Meal Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.meal}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meal Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{meal.meal}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`font-bold ${
                            meal.status === "take" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {meal.status === "take" ? "Taken" : "Skipped"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Note:</span> {meal.note}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Items:</span>{" "}
                        {meal.items.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealTracker;

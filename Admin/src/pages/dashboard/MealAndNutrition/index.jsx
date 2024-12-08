import React, { useState } from "react";
import { Button, Card, CardBody, Typography, Input } from "@material-tailwind/react";

const MealPlanForm = ({ onSubmit }) => {
  const [mealPlan, setMealPlan] = useState({
    wakeUpFood: [""], // Initialize with one empty string
    breakfast: [""],
    morningSnacks: [""],
    lunch: [""],
    eveningSnacks: [""],
    dinner: [""],
  });

  const handleChange = (e, mealType, index) => {
    const { value } = e.target;
    const updatedMeal = [...mealPlan[mealType]];
    updatedMeal[index] = value;
    setMealPlan({
      ...mealPlan,
      [mealType]: updatedMeal,
    });
  };

  const handleAddItem = (mealType) => {
    setMealPlan({
      ...mealPlan,
      [mealType]: [...mealPlan[mealType], ""], // Add a new empty string for the new input
    });
  };

  const handleRemoveItem = (mealType, index) => {
    const updatedMeal = mealPlan[mealType].filter((_, i) => i !== index);
    setMealPlan({
      ...mealPlan,
      [mealType]: updatedMeal,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mealPlan);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      {["wakeUpFood", "breakfast", "morningSnacks", "lunch", "eveningSnacks", "dinner"].map((mealType) => (
        <div key={mealType}>
          <Typography variant="h6">{mealType.replace(/([A-Z])/g, " $1")}</Typography>
          {mealPlan[mealType].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => handleChange(e, mealType, index)}
                label={`Item ${index + 1}`}
                className="flex-1"
              />
              <Button
                color="red"
                onClick={() => handleRemoveItem(mealType, index)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            color="green"
            onClick={() => handleAddItem(mealType)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Add Item
          </Button>
        </div>
      ))}
      <Button type="submit" color="green">
        Submit Meal Plan
      </Button>
    </form>
  );
};

export default MealPlanForm;

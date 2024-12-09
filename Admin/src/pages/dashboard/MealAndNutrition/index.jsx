import React, { useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import MealForm from "./MealForm";
import NutritionForm from "./NutritionForm";

const MealAndNutrition = () => {
  const [activeTab, setActiveTab] = useState("list"); 
  const [mealPlan, setMealPlan] = useState([]);
  const [nutritionInfo, setNutritionInfo] = useState([]);

  const handleMealSubmit = (mealData) => {
    setMealPlan([...mealPlan, mealData]);
    setActiveTab("list");
  };

  const handleNutritionSubmit = (nutritionData) => {
    setNutritionInfo([...nutritionInfo, nutritionData]);
    setActiveTab("list");
  };

  const renderList = () => (
    <Card>
      <CardBody>
        <Typography variant="h6" className="mb-4">
          Meal & Nutrition List
        </Typography>
        <Button onClick={() => setActiveTab("choose")} color="blue" className="mb-4">
          Add
        </Button>
        <div className="mt-4">
          <Typography variant="body2">Meal Plan:</Typography>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(mealPlan, null, 2)}</pre>
        </div>
        <div className="mt-4">
          <Typography variant="body2">Nutrition Info:</Typography>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(nutritionInfo, null, 2)}</pre>
        </div>
      </CardBody>
    </Card>
  );

  const renderAddOption = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button onClick={() => setActiveTab("meal")} color="green">
        Add Meal Plan
      </Button>
      <Button onClick={() => setActiveTab("nutrition")} color="orange">
        Add Nutrition Info
      </Button>
      <Button onClick={() => setActiveTab("list")} color="red">
        Cancel
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      {activeTab === "list" && renderList()}
      {activeTab === "choose" && renderAddOption()}
      {activeTab === "meal" && (
        <MealForm
          open={activeTab === "meal"}
          onClose={() => setActiveTab("list")}
          onSubmit={handleMealSubmit}
        />
      )}
      {activeTab === "nutrition" && (
        <NutritionForm
          open={activeTab === "nutrition"}
          onClose={() => setActiveTab("list")}
          onSubmit={handleNutritionSubmit}
        />
      )}
    </div>
  );
};

export default MealAndNutrition;

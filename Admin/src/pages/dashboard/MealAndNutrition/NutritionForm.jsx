import React, { useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";

const NutritionForm = ({ open, onClose, onSubmit }) => {
  const [nutritionData, setNutritionData] = useState({
    description: '',
    total: '',
  });

  const handleChange = (e) => {
    setNutritionData({
      ...nutritionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(nutritionData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-medium mb-4">Add Nutrition Info</h3>
        <div className="flex flex-col gap-4">
          <Input label="Total Nutrition Value" name="total" value={nutritionData.total} onChange={handleChange} />
          <Textarea label="Description" name="description" value={nutritionData.description} onChange={handleChange} />
          <Button onClick={handleSubmit} color="blue">
            Submit Nutrition
          </Button>
          <Button onClick={onClose} color="red">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NutritionForm;

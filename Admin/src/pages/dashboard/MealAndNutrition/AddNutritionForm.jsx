import React, { useState } from "react";
import { Select, Option, Input, Button, Textarea } from "@material-tailwind/react";
import axios from "axios";

const AddNutritionForm = ({ onAddNutrition, users, loading, error, handleCancel }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMealTime, setSelectedMealTime] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedMealTime || !description || !quantity) return;

    const nutrition = {
      userId: selectedUser,
      mealTime: selectedMealTime,
      description, // Updated field
      quantity,
    };

    axios
      .post("http://43.204.2.84:7200/admin/nutrition", nutrition)
      .then((response) => {
        if (response.data.status === "success") {
          onAddNutrition(response.data.data);
          handleReset();
        }
      })
      .catch((error) => {
        console.error("Error submitting nutrition:", error);
      });
  };

  const handleReset = () => {
    setSelectedUser("");
    setSelectedMealTime("");
    setDescription("");
    setQuantity("");
  };

  return (
    <div className="w-full p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-4">Add Nutrition Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Select
            label="Select User"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            {loading ? (
              <Option disabled>Loading users...</Option>
            ) : error ? (
              <Option disabled>Error loading users</Option>
            ) : (
              users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))
            )}
          </Select>
        </div>

        <div>
          <Select
            label="Select Meal Time"
            value={selectedMealTime}
            onChange={(e) => setSelectedMealTime(e.target.value)}
            required
          >
            <Option value="Breakfast">Breakfast</Option>
            <Option value="Lunch">Lunch</Option>
            <Option value="Dinner">Dinner</Option>
            <Option value="Night">Night</Option>
          </Select>
        </div>

        <div>
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            label="Quantity"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            color="red"
            variant="outlined"
            ripple
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="green"
            ripple
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNutritionForm;

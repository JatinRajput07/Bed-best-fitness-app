import React, { useState } from "react";
import Axios from "@/configs/Axios";
import toast from "react-hot-toast";

const AddNutritionForm = ({ onAddNutrition, users, loading, error, handleCancel }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMealTime, setSelectedMealTime] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const [errors, setErrors] = useState({
    selectedUser: "",
    selectedMealTime: "",
    description: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!selectedUser) validationErrors.selectedUser = "User selection is required.";
    if (!selectedMealTime) validationErrors.selectedMealTime = "Meal time selection is required.";
    if (!description) validationErrors.description = "Description is required.";
    if (!quantity) validationErrors.quantity = "Quantity is required.";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const nutrition = {
      userId: selectedUser,
      mealTime: selectedMealTime,
      description,
      quantity,
    };

    Axios.post("/admin/nutrition", nutrition)
      .then((response) => {
        if (response.data.status === "success") {
          onAddNutrition(response.data.data);
          handleReset();
        }
      })
      .catch((error) => {
        console.log(error.response.data.message,'==========================e=r=rr=r===================')
        toast.error(error?.response?.data?.message)
        console.error("Error submitting nutrition:", error);
      });
  };

  const handleReset = () => {
    setSelectedUser("");
    setSelectedMealTime("");
    setDescription("");
    setQuantity("");
    setErrors({});
  };

  return (
    <div className="w-full p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-4">Add Nutrition Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700">
            Select User
          </label>
          <select
            id="userSelect"
            className="mt-1 h-8 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>
              {loading ? "Loading users..." : "Select a user"}
            </option>
            {error ? (
              <option disabled>Error loading users</option>
            ) : (
              users.map((user) => (
                <option key={user.id} value={user._id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
          {errors.selectedUser && <p className="text-red-500 text-xs mt-1">{errors.selectedUser}</p>}
        </div>

        <div>
          <label htmlFor="mealTimeSelect" className="block text-sm font-medium text-gray-700">
            Select Nutrition Time
          </label>
          <select
            id="mealTimeSelect"
            className="mt-1 block px-2 h-8 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedMealTime}
            onChange={(e) => setSelectedMealTime(e.target.value)}
          >
            <option value="" disabled>Select a meal time</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Night">Night</option>
          </select>
          {errors.selectedMealTime && <p className="text-red-500 text-xs mt-1">{errors.selectedMealTime}</p>}
        </div>

        <div>
          <label htmlFor="descriptionInput" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="descriptionInput"
            className="mt-1 px-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="quantityInput" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="quantityInput"
            className="mt-1 px-2 h-8 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNutritionForm;

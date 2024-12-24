import React, { useState, useEffect } from "react";
import Axios from "@/configs/Axios";
import toast from "react-hot-toast";

const AddNutritionForm = ({ onAddNutrition, users, loading, error, handleCancel, editData }) => {
  const [selectedUser, setSelectedUser] = useState(editData?.userId || "");
  const [selectedMealTime, setSelectedMealTime] = useState(editData?.mealTime || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [quantity, setQuantity] = useState(editData?.quantity || "");

  const [errors, setErrors] = useState({
    selectedUser: "",
    selectedMealTime: "",
    description: "",
    quantity: "",
  });

  useEffect(() => {
    if (editData) {
      console.log(editData,'==d==d==d')
      setSelectedUser(editData.userId);
      setSelectedMealTime(editData.mealTime);
      setDescription(editData.description);
      setQuantity(editData.quantity);
    }
  }, [editData]);

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

    if (editData?._id) {
      Axios.put(`/admin/nutrition/${editData._id}`, nutrition)
        .then((response) => {
          if (response.data.status === "success") {
            // console.log(response.data.data,)
            onAddNutrition(response.data.data);
            handleReset();
            toast.success("Nutrition plan updated successfully.");
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to update nutrition plan.");
        });
    } else {
      Axios.post("/admin/nutrition", nutrition)
        .then((response) => {
          if (response.data.status === "success") {
            onAddNutrition(response.data.data);
            handleReset();
            toast.success("Nutrition plan added successfully.");
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to add nutrition plan.");
        });
    }
  };

  const handleReset = () => {
    setSelectedUser("");
    setSelectedMealTime("");
    setDescription("");
    setQuantity("");
    setErrors({});
    handleCancel();
  };

  return (
    <div className="w-full p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-4">{editData ? "Edit Nutrition Plan" : "Add Nutrition Plan"}</h2>
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
            onClick={handleReset}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            {editData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNutritionForm;

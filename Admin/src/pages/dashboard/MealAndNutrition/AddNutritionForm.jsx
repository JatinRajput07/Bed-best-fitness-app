import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import Axios from "@/configs/Axios";
import toast from "react-hot-toast";

const AddNutritionForm = ({ onAddNutrition, users, loading, handleCancel, editData }) => {
  // State for form inputs
  const [selectedUser, setSelectedUser] = useState(editData?.userId || "");
  const [selectedCategory, setSelectedCategory] = useState(editData?.mealTime || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [item, setItem] = useState({
    name: editData?.name || "",
    quantity: editData?.quantity || 1,
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Categories for selection
  const categories = ["Morning", "Lunch", "Evening", "Dinner"];

  // Function to reset the form
  const handleReset = () => {
    setSelectedUser("");
    setSelectedCategory("");
    setDescription("");
    setItem({ name: "", quantity: 1 });
    setErrors({});
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    let validationErrors = {};
    if (!selectedUser) validationErrors.selectedUser = "User selection is required.";
    if (!selectedCategory) validationErrors.selectedCategory = "Category selection is required.";
    if (!description) validationErrors.description = "Description is required.";
    if (!item.name.trim()) validationErrors.itemName = "Item name is required.";

    // Set validation errors
    setErrors(validationErrors);

    // If there are validation errors, stop the submission
    if (Object.keys(validationErrors).length > 0) return;

    // Prepare the data to be submitted
    const nutrition = {
      userId: selectedUser,
      category: selectedCategory,
      description,
      items: [
        {
          name: item.name.trim(),
          quantity: item.quantity,
        },
      ],
    };

    // If editing, use PUT request; otherwise, use POST request
    if (editData?._id) {
      Axios.put(`/admin/nutrition/${editData._id}`, nutrition)
        .then((response) => {
          if (response.data.status === "success") {
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

  return (
    <Dialog
      open
      size="lg" // Increased width
      handler={handleCancel}
      dismiss={{ enabled: false }} // Disable outside click to close
    >
      <DialogHeader>{editData ? "Edit Nutrition Plan" : "Add Nutrition Plan"}</DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User and Category in One Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Select
                  label="Select User"
                  value={selectedUser}
                  onChange={(value) => {
                    setSelectedUser(value);
                    setErrors((prev) => ({ ...prev, selectedUser: false })); // Clear user error
                  }}
                  error={!!errors.selectedUser}
                >
                  {users.map((user) => (
                    <Option key={user._id} value={user._id}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
                {errors.selectedUser && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.selectedUser}
                  </Typography>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <Select
                  label="Select Category"
                  value={selectedCategory}
                  onChange={(value) => {
                    setSelectedCategory(value);
                    setErrors((prev) => ({ ...prev, selectedCategory: false })); // Clear category error
                  }}
                  error={!!errors.selectedCategory}
                >
                  {categories.map((category, index) => (
                    <Option key={index} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
                {errors.selectedCategory && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.selectedCategory}
                  </Typography>
                )}
              </div>
            </div>

            {/* Description Input */}
            <div>
              <Textarea
                label="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: false })); // Clear description error
                }}
                error={!!errors.description}
              />
              {errors.description && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.description}
                </Typography>
              )}
            </div>

            {/* Item Section */}
            <div>
              <Typography variant="h6">Item</Typography>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => {
                    setItem((prev) => ({ ...prev, name: e.target.value }));
                    setErrors((prev) => ({ ...prev, itemName: false })); // Clear item name error
                  }}
                  error={!!errors.itemName}
                />
                <div className="flex items-center gap-1">
                  <Button
                    variant="text"
                    onClick={() =>
                      setItem((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))
                    }
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant="text"
                    onClick={() =>
                      setItem((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              {errors.itemName && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.itemName}
                </Typography>
              )}
            </div>
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={handleCancel} className="mr-2">
          Cancel
        </Button>
        <Button color="blue" onClick={handleSubmit} disabled={loading}>
          {editData ? "Update" : "Submit"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddNutritionForm;

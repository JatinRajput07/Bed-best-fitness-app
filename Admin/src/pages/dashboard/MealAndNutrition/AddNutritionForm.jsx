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
import { XMarkIcon } from "@heroicons/react/24/outline";

const CATEGORY_SEQUENCE = [
  "Pre Breakfast",
  "Post Breakfast",
  "Pre Lunch", 
  "Post Lunch",
  "Pre Dinner",
  "Post Dinner",
  "Before Sleep at Night",
  "In Every 2-3 hours"
];

const AddNutritionForm = ({ onAddNutrition, users, loading, handleCancel, editData }) => {
  const [selectedUser, setSelectedUser] = useState(editData?.userId || "");
  const [selectedCategory, setSelectedCategory] = useState(editData?.mealTime || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [item, setItem] = useState({
    name: editData?.name || "",
    quantity: editData?.quantity || 1,
  });
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setSelectedUser("");
    setSelectedCategory("");
    setDescription("");
    setItem({ name: "", quantity: 1 });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!selectedUser) validationErrors.selectedUser = "Please select a user";
    if (!selectedCategory) validationErrors.selectedCategory = "Please select a category";
    if (!description) validationErrors.description = "Description is required";
    if (!item.name.trim()) validationErrors.itemName = "Item name is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const nutrition = {
      userId: selectedUser,
      category: selectedCategory,
      description,
      items: [{
        name: item.name.trim(),
        quantity: item.quantity,
      }],
    };

    const apiCall = editData?._id 
      ? Axios.put(`/admin/nutrition/${editData._id}`, nutrition)
      : Axios.post("/admin/nutrition", nutrition);

    apiCall
      .then((response) => {
        if (response.data.status === "success") {
          onAddNutrition(response.data.data);
          handleReset();
          toast.success(`Nutrition plan ${editData?._id ? 'updated' : 'added'} successfully!`);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 
          `Failed to ${editData?._id ? 'update' : 'add'} nutrition plan`);
      });
  };

  return (
    <Dialog
      open
      size="lg"
      handler={handleCancel}
      dismiss={{ enabled: false }}
      className="rounded-lg"
    >
      <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between w-full">
          <Typography variant="h5" className="font-bold">
            {editData ? "Edit Nutrition Plan" : "Add New Nutrition Plan"}
          </Typography>
          <button onClick={handleCancel} className="hover:bg-white/10 p-1 rounded-full">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </DialogHeader>

      <DialogBody className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="Select User"
                value={selectedUser}
                onChange={(value) => {
                  setSelectedUser(value);
                  setErrors(prev => ({ ...prev, selectedUser: false }));
                }}
                error={!!errors.selectedUser}
                className="!border !border-gray-300 focus:!border-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                {users.filter(e => e?.role === "user").map((user) => (
                  <Option key={user._id} value={user._id} className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.name}</span>
                      {user.email && (
                        <span className="text-xs text-gray-500 truncate">({user.email})</span>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
              {errors.selectedUser && (
                <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                  {errors.selectedUser}
                </Typography>
              )}
            </div>

            <div>
              <Select
                label="Meal Time Category"
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                  setErrors(prev => ({ ...prev, selectedCategory: false }));
                }}
                error={!!errors.selectedCategory}
                className="!border !border-gray-300 focus:!border-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                {CATEGORY_SEQUENCE.map((category) => (
                  <Option key={category} value={category} className="hover:bg-blue-50">
                    {category}
                  </Option>
                ))}
              </Select>
              {errors.selectedCategory && (
                <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                  {errors.selectedCategory}
                </Typography>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors(prev => ({ ...prev, description: false }));
              }}
              error={!!errors.description}
              className="!border !border-gray-300 focus:!border-blue-500"
              rows={3}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.description && (
              <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                {errors.description}
              </Typography>
            )}
          </div>

          {/* Nutrition Item */}
          <div className="border border-gray-200 rounded-lg p-4">
            <Typography variant="h6" color="blue-gray" className="mb-4 font-semibold">
              Nutrition Item Details
            </Typography>
            
            <div className="space-y-4">
              <div>
                <Input
                  label="Item Name"
                  value={item.name}
                  onChange={(e) => {
                    setItem(prev => ({ ...prev, name: e.target.value }));
                    setErrors(prev => ({ ...prev, itemName: false }));
                  }}
                  error={!!errors.itemName}
                  className="!border !border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.itemName && (
                  <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                    {errors.itemName}
                  </Typography>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Typography variant="small" className="font-medium text-gray-700">
                  Quantity
                </Typography>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outlined"
                    size="sm"
                    color="blue-gray"
                    className="w-10 h-10 flex items-center justify-center p-0"
                    onClick={() => setItem(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                  >
                    -
                  </Button>
                  <Typography className="w-8 text-center font-bold">
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="sm"
                    color="blue-gray"
                    className="w-10 h-10 flex items-center justify-center p-0"
                    onClick={() => setItem(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogBody>

      <DialogFooter className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="text"
            color="gray"
            onClick={handleCancel}
            className="border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            color="blue"
            onClick={handleSubmit}
            disabled={loading}
            className="shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              editData ? "Update Plan" : "Add Plan"
            )}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default AddNutritionForm;
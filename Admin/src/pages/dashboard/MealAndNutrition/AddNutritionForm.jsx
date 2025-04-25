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
  Chip,
} from "@material-tailwind/react";
import Axios from "@/configs/Axios";
import toast from "react-hot-toast";

const AddNutritionForm = ({ onAddNutrition, users, loading, handleCancel, editData }) => {
  const [selectedUser, setSelectedUser] = useState(editData?.userId || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [item, setItem] = useState({
    name: editData?.name || "",
    totalQuantity: editData?.totalQuantity || 20, // Default to 20 as per requirement
  });
  const [errors, setErrors] = useState({});

  const categories = [
    "Pre Breakfast", "Post Breakfast", 
    "Pre Lunch", "Post Lunch",
    "Pre Dinner", "Post Dinner",
    "Before Sleep at Night",
    "In Every 2-3 hours"
  ];

  const handleReset = () => {
    setSelectedUser("");
    setDescription("");
    setItem({ name: "", totalQuantity: 20 });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!selectedUser) validationErrors.selectedUser = "User selection is required.";
    if (!item.name.trim()) validationErrors.itemName = "Item name is required.";
    if (item.totalQuantity <= 0) validationErrors.totalQuantity = "Quantity must be positive.";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const nutrition = {
      userId: selectedUser,
      description,
      name: item.name.trim(),
      totalQuantity: item.totalQuantity,
      categories: categories.map(category => ({
        name: category,
        consumed: 0,
        remaining: item.totalQuantity
      }))
    };

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
    <Dialog open size="lg" handler={handleCancel} dismiss={{ enabled: false }}>
      <DialogHeader>{editData ? "Edit Nutrition Plan" : "Add Nutrition Plan"}</DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Select
                  label="Select User"
                  value={selectedUser}
                  onChange={(value) => {
                    setSelectedUser(value);
                    setErrors((prev) => ({ ...prev, selectedUser: false }));
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
            </div>

            <div>
              <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Typography variant="h6">Nutrition Item</Typography>
              <div className="flex flex-col gap-4 mt-2">
                <Input
                  placeholder="Item Name (e.g., Omega 3 Tablet)"
                  value={item.name}
                  onChange={(e) => {
                    setItem((prev) => ({ ...prev, name: e.target.value }));
                    setErrors((prev) => ({ ...prev, itemName: false }));
                  }}
                  error={!!errors.itemName}
                />
                {errors.itemName && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.itemName}
                  </Typography>
                )}

                <div className="flex items-center gap-4">
                  <Typography>Total Quantity:</Typography>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="text"
                      onClick={() =>
                        setItem((prev) => ({ 
                          ...prev, 
                          totalQuantity: Math.max(1, prev.totalQuantity - 1) 
                        }))
                      }
                    >
                      -
                    </Button>
                    <Input 
                      type="number" 
                      value={item.totalQuantity} 
                      onChange={(e) => 
                        setItem(prev => ({ 
                          ...prev, 
                          totalQuantity: parseInt(e.target.value) || 0 
                        }))
                      }
                      className="w-20 text-center"
                    />
                    <Button
                      variant="text"
                      onClick={() =>
                        setItem((prev) => ({ 
                          ...prev, 
                          totalQuantity: prev.totalQuantity + 1 
                        }))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                {errors.totalQuantity && (
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.totalQuantity}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <Typography variant="h6" className="mb-2">Tracking Categories</Typography>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Chip 
                    key={index} 
                    value={category} 
                    className="cursor-default" 
                  />
                ))}
              </div>
              <Typography variant="small" className="mt-2 text-gray-600">
                These categories will be used to track consumption of this item.
              </Typography>
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
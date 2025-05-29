import React, { useEffect, useState } from "react";
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
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ReactSelect from "react-select";

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
  const [isInventory, setIsInventory] = useState(false)
  const [selectedUser, setSelectedUser] = useState(editData?.userId || "");
  const [nutritionData, setNutritionData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(editData?.mealTime || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [inventoryId, setInventoryId] = useState("");

  const [item, setItem] = useState({
    name: editData?.name || "",
    quantity: editData?.quantity || 1,
  });

  const [itemInventory, setItemInventory] = useState({
    title: "",
    quantity: 1,
    userId: "",
  });

  const [errors, setErrors] = useState({});

  const handleInventory = () => {
    setIsInventory(!isInventory)
  };

  useEffect(() => {
    if (selectedUser) {
      fetchNutritionData();
    }
  }, [isInventory, selectedUser]);

  const fetchNutritionData = () => {
    Axios.get(`/admin/inventory/${selectedUser}`)
      .then((response) => {
        if (response.data.status === "success") {
          setNutritionData(response.data.data);
          setInventoryId("");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ||
          `Failed to ${editData?._id ? 'update' : 'add'} Supplements plan`);
      });
  };


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
    // if (!description) validationErrors.description = "Description is required";
    if (!item.name.trim()) validationErrors.itemName = "Item name is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const get = nutritionData.find((val => val.title === item.name.trim()))
    const nutrition = {
      userId: selectedUser,
      inventoryId: get?._id,
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

  const handleSubmitInventory = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!itemInventory.title) validationErrors.title = "Title is required";

    const formData = {
      userId: selectedUser,
      quantity: itemInventory.quantity,
      title: itemInventory.title,
      inventoryId: inventoryId,
    };

    Axios.post(`/admin/inventory/add/`, formData)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(`Inventory added successfully!`);
          setIsInventory(false)
          setItemInventory({ title: "", userId: "" });
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || `Failed to add inventory`);
      });
  }

  const handleDeleteInventory = (id) => {
    if (!id) {
      toast.success(`Inventory id required!`);
      return
    }

    Axios.delete(`/admin/inventory/delete/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(`Inventory deleted successfully!`);
          if (selectedUser) {
            fetchNutritionData();
          }
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || `Failed to add inventory`);
      });
  }

  const options = users
    .filter((user) => user.role === "user")
    .map((user) => ({
      value: user._id,
      label: `${user.name} (${user.email})`,
    }));

  const optionsInventory = nutritionData
    .map((val) => ({
      value: val.title,
      label: val?.title,
    }));


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
            {!isInventory ? editData ? "Edit Nutrition Plan" : "Add New Supplements Plan" : "Add Inventory"}
          </Typography>
          {!isInventory ? (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2  ml-auto" onClick={handleInventory}>
              Add & Manage Inventory
            </Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2  ml-auto" onClick={handleInventory}>
              Back
            </Button>
          )}
          <button onClick={handleCancel} className="hover:bg-white/10 p-1 rounded-full">
            <XMarkIcon className="h-5 w-5" />
          </button>

        </div>
      </DialogHeader>
      {isInventory ? (
        <DialogBody className="p-6">
          <form onSubmit={handleSubmitInventory} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ReactSelect
                  options={options}
                  value={options.find((opt) => opt.value === selectedUser)}
                  onChange={(selected) => {
                    setSelectedUser(selected.value);
                    setErrors((prev) => ({ ...prev, selectedUser: false }));
                  }}
                  placeholder="Select User"
                  classNamePrefix="react-select"
                />
                {errors.selectedUser && (
                  <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                    {errors.selectedUser}
                  </Typography>
                )}

              </div>
              <div>
                <Input
                  label="Title"
                  value={itemInventory.title}
                  onChange={(e) => {
                    setItemInventory(prev => ({ ...prev, title: e.target.value }));
                    setErrors(prev => ({ ...prev, itemName: false }));
                  }}
                  error={!!errors.itemName}
                  className="!border !border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.title && (
                  <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                    {errors.title}
                  </Typography>
                )}
              </div>
              <Input
                label="Quantity"
                type="number"
                value={itemInventory.quantity}
                onChange={(e) => {
                  setItemInventory(prev => ({ ...prev, quantity: e.target.value }));
                }}
                error={!!errors.quantity}
                className="!border !border-gray-300 focus:!border-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.quantity && (
                <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                  {errors.quantity}
                </Typography>
              )}
            </div>
          </form>
          <hr className="mt-3" />
          {nutritionData.length > 0 && nutritionData.map((item) => (
            <div className="flex items-center justify-between mt-4">
              <Typography variant="small" className="font-medium text-gray-700">{item?.title}  - </Typography>
              <Typography variant="small" className="font-semibold text-green-800">{item?.quantity || 0} </Typography>
              <div className="flex items-center gap-4">
                <Button
                  variant="text"
                  color="blue"
                  size="sm"
                  className="p-1"
                  onClick={() => {
                    setInventoryId(item?._id);
                    setItemInventory({ title: item?.title, quantity: item?.quantity });
                    setSelectedUser(item?.userId);
                  }}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="text"
                  color="red"
                  size="sm"
                  className="p-1"
                  onClick={() => {
                    handleDeleteInventory(item?._id);
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </DialogBody>
      ) : (
        <DialogBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Typography variant="small" className="font-medium text-gray-700">
                  Select User
                </Typography>
                <ReactSelect
                  options={options}
                  value={options.find((opt) => opt.value === selectedUser)}
                  onChange={(selected) => {
                    setSelectedUser(selected.value);
                    setErrors((prev) => ({ ...prev, selectedUser: false }));
                  }}
                  placeholder="Select a user"
                  classNamePrefix="react-select"
                />
                {errors.selectedUser && (
                  <Typography variant="small" color="red" className="mt-1 flex items-center gap-1">
                    {errors.selectedUser}
                  </Typography>
                )}
              </div>

              <div className="space-y-1">
                <Typography variant="small" className="font-medium text-gray-700">
                  Meal Time Category
                </Typography>
                <Select
                  value={selectedCategory}
                  onChange={(value) => {
                    setSelectedCategory(value);
                    setErrors(prev => ({ ...prev, selectedCategory: false }));
                  }}
                  error={!!errors.selectedCategory}
                  className="!border !border-gray-300 focus:!border-blue-500"
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
            <div className="space-y-1">
              <Typography variant="small" className="font-medium text-gray-700">
                Description (optional)
              </Typography>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors(prev => ({ ...prev, description: false }));
                }}
                error={!!errors.description}
                className="!border !border-gray-300 focus:!border-blue-500"
                rows={3}
              />
            </div>

            {/* Nutrition Item */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <Typography variant="h6" color="blue-gray" className="font-semibold">
                Supplements Item Details
              </Typography>

              <div className="space-y-4">
                <div className="space-y-1">
                  <Typography variant="small" className="font-medium text-gray-700">
                    Select Inventory
                  </Typography>
                  <ReactSelect
                    options={optionsInventory}
                    value={optionsInventory.find((opt) => opt.value === item.name)}
                    onChange={(selected) => {
                      setItem((prev) => ({ ...prev, name: selected?.value }));
                    }}
                    placeholder="Select inventory item"
                    classNamePrefix="react-select"
                  />
                </div>

                <div className="space-y-1">
                  <Typography variant="small" className="font-medium text-gray-700">
                    Dose
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
      )}

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
            onClick={isInventory ? handleSubmitInventory : handleSubmit}
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
              !isInventory ? editData ? "Update Plan" : "Add Plan" : inventoryId ? "Update Inventory" : "Add Inventory"
            )}
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default AddNutritionForm;
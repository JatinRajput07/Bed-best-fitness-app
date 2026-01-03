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

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#3b82f6" : "#e5e7eb",
    borderWidth: "1px",
    minHeight: "44px",
    padding: "2px",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
        ? "#eff6ff"
        : "white",
    color: state.isSelected ? "white" : "#374151",
    cursor: "pointer",
    padding: "10px 12px",
  }),
  input: (provided) => ({
    ...provided,
    color: "#374151",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#374151",
    fontWeight: "500"
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 9999,
    border: "1px solid #f3f4f6"
  })
};

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
    // if (selectedUser) {
    fetchNutritionData();
    // }
  }, [isInventory, selectedUser]);

  const fetchNutritionData = () => {
    Axios.get(`/admin/inventory`)
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
      // userId: selectedUser,
      isAdminAdded: true,
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
          fetchNutritionData();
          toast.success(`Inventory deleted successfully!`);
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
      size="xl"
      handler={handleCancel}
      dismiss={{ enabled: false }}
      className="bg-transparent shadow-none p-0 overflow-visible"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] w-full">
        <DialogHeader className="relative p-6 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shrink-0">
          <div className="flex items-center justify-between w-full relative z-10">
            <div className="flex flex-col gap-1">
              <Typography variant="h4" color="white" className="font-bold tracking-tight">
                {!isInventory ? (editData ? "Edit Nutrition Plan" : "Create Supplements Plan") : "Inventory Management"}
              </Typography>
              <Typography variant="small" className="text-blue-100 font-normal opacity-90">
                {!isInventory ? "Assign supplements and meal schedules to users." : "Add and manage stock items for nutrition plans."}
              </Typography>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="text"
                className={`flex items-center gap-2 text-white hover:bg-white/20 active:bg-white/30 rounded-lg px-4 py-2 transition-all normal-case font-medium ${isInventory ? 'bg-white/20' : ''}`}
                onClick={handleInventory}
              >
                {isInventory ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Plan
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>
                    Manage Inventory
                  </>
                )}
              </Button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-full hover:bg-white/20 transition-all text-white hover:rotate-90 duration-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {isInventory ? (
            <DialogBody className="p-6 md:p-8 space-y-8">
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <Typography variant="h6" color="blue-gray">Add New Item</Typography>
                </div>
                <form onSubmit={handleSubmitInventory} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-7">
                    <Typography variant="small" className="mb-2 font-medium text-blue-gray-800">Item Title</Typography>
                    <Input
                      labelProps={{ className: "hidden" }}
                      placeholder="e.g. Whey Protein"
                      size="lg"
                      value={itemInventory.title}
                      onChange={(e) => {
                        setItemInventory(prev => ({ ...prev, title: e.target.value }));
                        setErrors(prev => ({ ...prev, itemName: false }));
                      }}
                      error={!!errors.itemName}
                      className="!border !border-gray-300 bg-white placeholder:text-gray-400 focus:!border-blue-500"
                      containerProps={{ className: "min-w-0" }}
                    />
                    {errors.title && (
                      <Typography variant="small" color="red" className="mt-1 flex items-center gap-1 font-medium">
                        {errors.title}
                      </Typography>
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <Typography variant="small" className="mb-2 font-medium text-blue-gray-800">Qty</Typography>
                    <Input
                      type="number"
                      labelProps={{ className: "hidden" }}
                      placeholder="0"
                      size="lg"
                      value={itemInventory.quantity}
                      onChange={(e) => {
                        setItemInventory(prev => ({ ...prev, quantity: e.target.value }));
                      }}
                      error={!!errors.quantity}
                      className="!border !border-gray-300 bg-white placeholder:text-gray-400 focus:!border-blue-500"
                      containerProps={{ className: "min-w-0" }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button
                      color="blue"
                      fullWidth
                      size="lg"
                      onClick={handleSubmitInventory}
                      disabled={loading}
                      className="shadow-md hover:shadow-lg transition-all h-[44px]"
                    >
                      {inventoryId ? "Update" : "Add"}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="space-y-4">
                <Typography variant="small" className="font-bold text-gray-500 uppercase tracking-wider">
                  Current Inventory ({nutritionData.length})
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nutritionData.length > 0 ? nutritionData.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                          {item?.quantity || 0}
                        </div>
                        <div className="min-w-0">
                          <Typography variant="h6" color="blue-gray" className="leading-snug truncate pr-2">
                            {item?.title}
                          </Typography>
                          <Typography variant="small" className="text-gray-400 font-medium text-xs">
                            Stock Available
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="text" color="blue" size="sm" className="p-2 rounded-lg hover:bg-blue-50"
                          onClick={() => {
                            setInventoryId(item?._id);
                            setItemInventory({ title: item?.title, quantity: item?.quantity });
                            setSelectedUser(item?.userId);
                          }}>
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="text" color="red" size="sm" className="p-2 rounded-lg hover:bg-red-50"
                          onClick={() => handleDeleteInventory(item?._id)}>
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-10 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                      No inventory items found. Add one above.
                    </div>
                  )}
                </div>
              </div>
            </DialogBody>
          ) : (
            <>
              <DialogBody className="p-6 md:p-8 space-y-8">
                <form id="nutrition-form" onSubmit={handleSubmit} className="space-y-8">
                  {/* Form layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-gray-800">Assign to User</label>
                      <ReactSelect
                        options={options}
                        value={options.find((opt) => opt.value === selectedUser)}
                        onChange={(selected) => {
                          setSelectedUser(selected.value);
                          setErrors((prev) => ({ ...prev, selectedUser: false }));
                        }}
                        placeholder="Search or select a user..."
                        classNamePrefix="react-select"
                        styles={customSelectStyles}
                      />
                      {errors.selectedUser && (
                        <Typography variant="small" color="red" className="flex items-center gap-1 font-medium">
                          {errors.selectedUser}
                        </Typography>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-gray-800">Meal Time</label>
                      <Select
                        size="lg"
                        value={selectedCategory}
                        onChange={(value) => {
                          setSelectedCategory(value);
                          setErrors(prev => ({ ...prev, selectedCategory: false }));
                        }}
                        error={!!errors.selectedCategory}
                        className="!border-gray-200 focus:!border-blue-600 bg-white text-blue-gray-700"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "!min-w-0" }}
                        selected={(element) =>
                          element &&
                          React.cloneElement(element, {
                            disabled: true,
                            className:
                              "flex items-center opacity-100 px-0 gap-2 pointer-events-none text-blue-gray-900",
                          })
                        }
                      >
                        {CATEGORY_SEQUENCE.map((category) => (
                          <Option key={category} value={category} className="hover:bg-blue-50 py-3 text-blue-gray-800">
                            {category}
                          </Option>
                        ))}
                      </Select>
                      {errors.selectedCategory && (
                        <Typography variant="small" color="red" className="flex items-center gap-1 font-medium">
                          {errors.selectedCategory}
                        </Typography>
                      )}
                    </div>
                  </div>

                  {/* Nutrition Details Card */}
                  <div className="bg-gray-50/80 rounded-2xl p-6 md:p-8 border border-gray-200 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <Typography variant="h6" color="blue-gray" className="font-bold">Supplements Details</Typography>
                        <Typography variant="small" className="text-gray-500">Configure the supplement Item and quantity.</Typography>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-8 space-y-2">
                        <label className="text-sm font-bold text-blue-gray-700">Select Item from Inventory</label>
                        <ReactSelect
                          options={optionsInventory}
                          value={optionsInventory.find((opt) => opt.value === item.name)}
                          onChange={(selected) => {
                            setItem((prev) => ({ ...prev, name: selected?.value }));
                          }}
                          placeholder="Select item..."
                          classNamePrefix="react-select"
                          styles={customSelectStyles}
                        />
                        {errors.itemName && (
                          <Typography variant="small" color="red" className="flex items-center gap-1 font-medium">
                            {errors.itemName}
                          </Typography>
                        )}
                      </div>

                      <div className="md:col-span-4 space-y-2">
                        <label className="text-sm font-bold text-blue-gray-700">Dose / Quantity</label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outlined"
                            color="blue-gray"
                            className="w-11 h-[44px] p-0 flex items-center justify-center rounded-lg border-gray-300 hover:border-blue-500 hover:text-blue-500 focus:ring-2 focus:ring-blue-100 active:scale-95 transition-all text-lg"
                            onClick={() => setItem(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                          >
                            -
                          </Button>
                          <div className="h-[44px] flex-1 flex items-center justify-center bg-white border border-gray-300 rounded-lg font-bold text-gray-800 text-lg shadow-sm">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outlined"
                            color="blue-gray"
                            className="w-11 h-[44px] p-0 flex items-center justify-center rounded-lg border-gray-300 hover:border-blue-500 hover:text-blue-500 focus:ring-2 focus:ring-blue-100 active:scale-95 transition-all text-lg"
                            onClick={() => setItem(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-gray-700">Notes / Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <Textarea
                        placeholder="Add any specific instructions like 'Take with warm water'..."
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setErrors(prev => ({ ...prev, description: false }));
                        }}
                        error={!!errors.description}
                        className="!border !border-gray-200 focus:!border-blue-500 bg-white"
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-0" }}
                        rows={3}
                      />
                    </div>
                  </div>

                </form>
              </DialogBody>
              <DialogFooter className="p-6 bg-white border-t border-gray-100 flex items-center justify-end gap-3 rounded-b-2xl">
                <Button
                  variant="text"
                  color="gray"
                  onClick={handleCancel}
                  className="text-gray-600 hover:bg-gray-100 rounded-xl px-6"
                >
                  Cancel
                </Button>

                <Button
                  color="blue"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 rounded-xl px-8 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    editData ? "Save Changes" : "Save Nutrition Plan"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default AddNutritionForm;
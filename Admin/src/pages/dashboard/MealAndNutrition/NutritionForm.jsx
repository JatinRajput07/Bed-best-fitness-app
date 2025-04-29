import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button, Input, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import Axios from "@/configs/Axios";
import { fetchUsers } from "@/redux/userSlice";
import AddNutritionForm from "./AddNutritionForm";
import toast from "react-hot-toast";

const Nutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editNutrition, setEditNutrition] = useState(null);
  const [deleteNutritionId, setDeleteNutritionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { users, loading } = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowForm(false);
    setEditNutrition(null);
  };

  const fetchNutritionData = () => {
    setIsLoading(true);
    Axios.get("/admin/nutrition")
      .then((response) => {
        if (response.data.status === "success") {
          const sortedData = response.data.data.sort((a, b) =>
            (a?.userDetails?.name || a?.userDetails?.email).localeCompare(
              b?.userDetails?.name || b?.userDetails?.email
            )
          );
          setNutritionData(sortedData);  // ✅ ADD THIS
          setFilteredData(sortedData);   // Already present
  
          if (sortedData.length > 0) {
            if (!selectedUser) {
              setSelectedUser(sortedData[0]);
            } else {
              const user = sortedData.find((user) => user.userId === selectedUser.userId);
              if (user) {
                setSelectedUser(user);
              }
            }
          }
        } else {
          setNutritionData([]);   
          setFilteredData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching nutrition data:", error);
        toast.error("Failed to fetch nutrition data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(fetchUsers({}));
    fetchNutritionData();
  }, [dispatch]);

  const handleAddNutrition = (newNutrition) => {
    if (!newNutrition || typeof newNutrition !== "object" || !newNutrition._id) {
      toast.error("Invalid nutrition data.");
      return;
    }

    setNutritionData((prevState) => {
      const updatedData = editNutrition
        ? prevState.map((item) => (item._id === newNutrition._id ? newNutrition : item))
        : [...prevState, newNutrition];
      return updatedData.sort((a, b) =>
        (a?.userDetails?.name || a?.userDetails?.email || "").localeCompare(
          b?.userDetails?.name || b?.userDetails?.email
        )
      );
    });

    setFilteredData((prevState) => {
      const updatedData = editNutrition
        ? prevState.map((item) => (item._id === newNutrition._id ? newNutrition : item))
        : [...prevState, newNutrition];
      return updatedData.sort((a, b) =>
        (a?.userDetails?.name || a?.userDetails?.email || "").localeCompare(
          b?.userDetails?.name || b?.userDetails?.email
        )
      );
    });

    setShowForm(false);
    setEditNutrition(null);
    fetchNutritionData();
  };

  const handleDelete = () => {
    if (!deleteNutritionId) return;

    Axios.delete(`/admin/nutrition/${deleteNutritionId}`)
      .then((response) => {
        if (response.data.status === "success") {
          setNutritionData((prevState) =>
            prevState.filter((item) => item._id !== deleteNutritionId)
          );
          setFilteredData((prevState) =>
            prevState.filter((item) => item._id !== deleteNutritionId)
          );
           fetchNutritionData()
          toast.success("Nutrition plan deleted successfully.");
        }
      })
      .catch((error) => {
        console.error("Error deleting nutrition plan:", error);
        toast.error("Failed to delete nutrition plan.");
      })
      .finally(() => setDeleteNutritionId(null));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(nutritionData);
    } else {
      const filtered = nutritionData.filter((user) => {
        const name = user?.userDetails?.name || '';
        const email = user?.userDetails?.email || '';
        return (name + email).toLowerCase().includes(query);
      });
      setFilteredData(filtered);
    }
  
    setCurrentPage(1);
  };
  
  // Pagination helpers
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-8 mb-8 flex flex-col items-center">
      <Card className="w-full max-w-6xl shadow-lg mb-6">
        <CardHeader
          variant="gradient"
          className="bg-gradient-to-r from-blue-600 to-indigo-800 p-6 rounded-t-lg flex justify-between items-center"
        >
          <Typography variant="h5" color="white" className="font-bold">
            Nutrition Management
          </Typography>
          <Button 
            color="white" 
            onClick={() => setShowForm(true)}
            className="shadow-md hover:shadow-lg transition-all"
          >
            Add Nutrition Plan
          </Button>
        </CardHeader>
        {!showForm ? (
          <div className="flex flex-col md:flex-row">
            {/* Left Side: User List */}
            <div className="w-full md:w-1/4 border-r p-4 bg-gray-50">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="!border !border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Typography variant="small" className="text-gray-600">
                    Loading users...
                  </Typography>
                </div>
              ) : paginatedData.length > 0 ? (
                <div className="space-y-2">
                  {paginatedData.map((user, index) => (
                    <div
                      key={user.userId}
                      className={`p-3 cursor-pointer rounded-lg transition-all ${
                        selectedUser?.userId === user.userId
                          ? "bg-blue-100 border-l-4 border-blue-500"
                          : "hover:bg-gray-100 border-l-4 border-transparent"
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <Typography variant="small" className="font-semibold">
                        {index + 1}. {user?.userDetails?.name || user?.userDetails?.email}
                      </Typography>
                    </div>
                  ))} 
                </div>
              ) : (
                <div className="p-4 text-center bg-gray-100 rounded-lg">
                  <Typography variant="small" className="text-gray-600">
                    No users found
                  </Typography>
                </div>
              )}
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outlined"
                    color="blue"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Typography variant="small" color="gray">
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="blue"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Right Side: Nutrition Details */}
            <div className="w-full md:w-3/4 p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Typography variant="small" className="text-gray-600">
                    Loading nutrition details...
                  </Typography>
                </div>
              ) : selectedUser ? (
                <div>
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <Typography variant="h6" color="blue-gray" className="font-bold">
                      {selectedUser?.userDetails?.name || selectedUser?.userDetails?.email}
                    </Typography>
                    <Typography variant="small" color="gray">
                      Nutrition Plan Details
                    </Typography>
                  </div>

                  {selectedUser?.mealTimeGroups?.map((mealTimeGroup, index) => (
                    <Card key={index} className="mb-6 shadow-sm border">
                      <CardHeader 
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b"
                        floated={false}
                        shadow={false}
                      >
                        <Typography variant="h6" color="blue-gray" className="font-semibold uppercase">
                          {mealTimeGroup.mealTime}
                        </Typography>
                      </CardHeader>
                      <CardBody className="p-0">
                        {mealTimeGroup.nutritionDetails.map((nutrition, idx) => (
                          <div 
                            key={idx} 
                            className="border-b last:border-none p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div className="flex-1">
                                <Typography variant="h6" className="font-semibold text-blue-800">
                                  {nutrition.name}
                                </Typography>
                                {nutrition.description && (
                                  <Typography variant="small" className="text-gray-600 mt-1">
                                    {nutrition.description}
                                  </Typography>
                                )}
                              </div>
                              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="bg-blue-50 px-3 py-1 rounded-full">
                                  <Typography variant="small" className="font-semibold text-blue-800">
                                    Total Stock: {nutrition?.stockQuantity}
                                  </Typography>
                                </div>
                                <div className="bg-blue-50 px-3 py-1 rounded-full">
                                  <Typography variant="small" className="font-semibold text-blue-800">
                                    Remaining Stock: {nutrition?.stockQuantity - nutrition?.takenCount}
                                  </Typography>
                                </div>
                                <div className="bg-green-50 px-3 py-1 rounded-full">
                                  <Typography variant="small" className="font-semibold text-green-800">
                                    Used: {nutrition?.takenCount || 0}
                                  </Typography>
                                </div>
                                <div className="bg-green-50 px-3 py-1 rounded-full">
                                  <Typography variant="small" className="font-semibold text-green-800">
                                    Daily Dose: {nutrition?.quantity || 0}
                                  </Typography>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="text"
                                    color="blue"
                                    size="sm"
                                    className="p-1"
                                    onClick={() => {
                                      setEditNutrition({ ...nutrition, userId: selectedUser.userId });
                                      setShowForm(true);
                                    }}
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="text"
                                    color="red"
                                    size="sm"
                                    className="p-1"
                                    onClick={() => setDeleteNutritionId(nutrition._id)}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <Typography variant="h6" color="gray" className="mb-2">
                    No user selected
                  </Typography>
                  <Typography variant="small" color="gray">
                    Select a user from the list to view nutrition details
                  </Typography>
                </div>
              )}
            </div>
          </div>
        ) : (
          <AddNutritionForm
            onAddNutrition={handleAddNutrition}
            users={users}
            loading={loading}
            handleCancel={handleCancel}
            editData={editNutrition}
          />
        )}
      </Card>
      
      {/* Confirmation Dialog */}
      <Dialog open={Boolean(deleteNutritionId)} handler={() => setDeleteNutritionId(null)}>
        <DialogHeader className="bg-gray-100 text-center py-4">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Confirm Deletion
          </Typography>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center gap-6 p-6">
          <div className="p-4 rounded-full bg-red-100 flex justify-center items-center">
            <TrashIcon className="h-10 w-10 text-red-500" />
          </div>
          <Typography className="text-center text-base font-medium text-blue-gray-600">
            Are you sure you want to delete this nutrition item? This action cannot be undone.
          </Typography>
        </DialogBody>
        <DialogFooter className="bg-gray-50 flex justify-center gap-4 py-4">
          <Button 
            variant="outlined"
            color="blue-gray"
            onClick={() => setDeleteNutritionId(null)}
            className="w-24"
          >
            Cancel
          </Button>
          <Button 
            variant="gradient"
            color="red"
            onClick={handleDelete}
            className="w-24"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Nutrition;
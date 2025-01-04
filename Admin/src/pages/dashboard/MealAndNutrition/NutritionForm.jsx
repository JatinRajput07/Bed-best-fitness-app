import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button, Input, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
  const [pageSize, setPageSize] = useState(5); // Items per page
  const { users, loading } = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(false); // Local loading state
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
          // Sort users by name or email
          const sortedData = response.data.data.sort((a, b) =>
            (a?.userDetails?.name || a?.userDetails?.email).localeCompare(
              b?.userDetails?.name || b?.userDetails?.email
            )
          );
          setNutritionData(sortedData);
          setFilteredData(sortedData);
          // Set the first user as selected by default
          if (sortedData.length > 0) {
            setSelectedUser(sortedData[0]);
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
      // Sort the updated data
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
      // Sort the updated data
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
    setFilteredData(
      nutritionData.filter((user) =>
        (user?.userDetails?.name || user?.userDetails?.email).toLowerCase().includes(query)
      )
    );
    setCurrentPage(1); // Reset to the first page
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
    <div className="mt-12 mb-8 flex flex-col items-center">
      <Card className="w-full max-w-6xl shadow-lg mb-6">
        <CardHeader
          variant="gradient"
          className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center"
        >
          <Typography variant="h5" color="white">
            Nutrition Plans
          </Typography>
          <Button color="lightBlue" onClick={() => setShowForm(true)}>
            Add Nutrition
          </Button>
        </CardHeader>
        {!showForm ? (
          <div className="flex flex-col md:flex-row">
            {/* Left Side: User List */}
            <div className="w-full md:w-1/4 border-r p-4">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search by user name"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="mb-4"
                />
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Typography variant="small" className="text-gray-600">
                    Please wait...
                  </Typography>
                </div>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((user, index) => (
                  <div
                    key={user.userId}
                    className={`p-3 cursor-pointer rounded-lg mb-2 ${
                      selectedUser?.userId === user.userId
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <Typography variant="small" className="font-semibold">
                      {index + 1}. {user?.userDetails?.name || user?.userDetails?.email}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="small" className="text-gray-600 text-center">
                  No data found.
                </Typography>
              )}
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                  <Button
                    color="gray"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Typography>{`${currentPage} / ${totalPages}`}</Typography>
                  <Button
                    color="gray"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Right Side: User Details */}
            <div className="w-full md:w-3/4 p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Typography variant="small" className="text-gray-600">
                    Please wait...
                  </Typography>
                </div>
              ) : selectedUser ? (
                <div>
                  {selectedUser?.mealTimeGroups?.map((mealTimeGroup, index) => (
                    <Card key={index} className="mt-6 mb-6 shadow-sm">
                      <CardHeader className="bg-gray-100 p-4">
                        <Typography variant="h6" className="text-gray-700">
                          {mealTimeGroup.mealTime}
                        </Typography>
                      </CardHeader>
                      <CardBody className="p-4">
                        {mealTimeGroup.nutritionDetails.map((nutrition, idx) => (
                          <div key={idx} className="border-b last:border-none py-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                              <div className="w-96 mb-2 md:mb-0">
                                <Typography variant="small" className="font-semibold">
                                  {nutrition.name}
                                </Typography>
                                <Typography variant="small" className="text-gray-600">
                                  {nutrition.description}
                                </Typography>
                              </div>
                              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                <Typography variant="small">
                                  Quantity: {nutrition.quantity}
                                </Typography>
                                <Typography variant="small">
                                  Taken: {nutrition.takenCount}
                                </Typography>
                                <Typography variant="small">
                                  Skipped: {nutrition.skippedCount}
                                </Typography>
                                <div
                                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    nutrition.status === "completed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {nutrition.status}
                                </div>
                                <div className="flex space-x-2">
                                  <PencilIcon
                                    className="h-5 w-5 text-blue-500 cursor-pointer"
                                    onClick={() => {
                                      setEditNutrition({ ...nutrition, userId: selectedUser.userId });
                                      setShowForm(true);
                                    }}
                                  />
                                  <TrashIcon
                                    className="h-5 w-5 text-red-500 cursor-pointer"
                                    onClick={() => setDeleteNutritionId(nutrition._id)}
                                  />
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
                <Typography variant="h6" className="text-gray-700 text-center">
                  Select a user to view details.
                </Typography>
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
            Are you sure you want to delete this nutrition plan?
          </Typography>
        </DialogBody>
        <DialogFooter className="bg-gray-50 flex justify-center gap-4 py-4">
          <Button variant="outlined"
            color="blue-gray"
            className="w-24" onClick={() => setDeleteNutritionId(null)}>
            Cancel
          </Button>
          <Button variant="gradient"
            color="red"
            className="w-24" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Nutrition;


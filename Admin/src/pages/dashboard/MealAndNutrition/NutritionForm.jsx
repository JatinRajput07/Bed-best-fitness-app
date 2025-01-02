import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button, Input, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
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
  const [expandedUserId, setExpandedUserId] = useState(null);
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

  const toggleAccordion = (userId) => {
    setExpandedUserId((prevUserId) => (prevUserId === userId ? null : userId));
  };

  const fetchNutritionData = () => {
    setIsLoading(true);
    Axios.get("/admin/nutrition")
      .then((response) => {
        if (response.data.status === "success") {
          setNutritionData(response.data.data);
          setFilteredData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching nutrition data:", error);
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
      if (editNutrition) {
        return prevState.map((item) => (item._id === newNutrition._id ? newNutrition : item));
      }
      return [...prevState, newNutrition];
    });
    setFilteredData((prevState) => {
      if (editNutrition) {
        return prevState.map((item) => (item._id === newNutrition._id ? newNutrition : item));
      }
      return [...prevState, newNutrition];
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
          setNutritionData((prevState) => prevState.filter((item) => item._id !== deleteNutritionId));
          setFilteredData((prevState) => prevState.filter((item) => item._id !== deleteNutritionId));
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
        user?.userDetails?.name.toLowerCase().includes(query)
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
          <CardBody className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="flex justify-between items-center mb-4">
              <Input
                type="text"
                placeholder="Search by user name"
                value={searchQuery}
                onChange={handleSearch}
                className="w-1/2"
              />
            </div>
            {/* Loader */}
            {loading || isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            ) : (
              paginatedData.map((user) => (
                <div key={user.userId} className="border-b pb-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-lg"
                    onClick={() => toggleAccordion(user.userId)}
                  >
                    <Typography variant="h6" className="text-gray-700">
                      {user?.userDetails?.name || user?.userDetails?.email}
                    </Typography>
                    {expandedUserId === user.userId ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {expandedUserId === user.userId && (
                    <div className="mt-4">
                      {/* Table Headers */}
                      <div className="grid grid-cols-7 gap-4 text-gray-700 font-semibold bg-gray-200 p-3 rounded-t-lg">
                        <div>Meal Time</div>
                        <div>Description</div>
                        <div>Quantity</div>
                        <div>Taken</div>
                        <div>Skipped</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      {user.nutritionDetails.map((nutrition, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-4 p-4 bg-white border-b last:border-none"
                        >
                          <div>{nutrition.mealTime}</div>
                          <div>{nutrition.description}</div>
                          <div>{nutrition.quantity}</div>
                          <div>{nutrition.takenCount}</div>
                          <div>{nutrition.skippedCount}</div>
                          <div
                            className={
                              nutrition.status === "completed"
                                ? "text-green-500 font-semibold"
                                : "text-red-500 font-semibold"
                            }
                          >
                            {nutrition.status}
                          </div>
                          <div className="flex space-x-2">
                            <PencilIcon
                              className="h-5 w-5 text-blue-500 cursor-pointer"
                              onClick={() => {
                                setEditNutrition({ ...nutrition, userId: user.userId });
                                setShowForm(true);
                              }}
                            />
                            <TrashIcon
                              className="h-5 w-5 text-red-500 cursor-pointer"
                              onClick={() => setDeleteNutritionId(nutrition._id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
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
          </CardBody>
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
        <DialogBody>
          <Typography variant="h6" className="text-center">
            Are you sure you want to delete this nutrition plan?
          </Typography>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <Button color="red" onClick={() => setDeleteNutritionId(null)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Nutrition;

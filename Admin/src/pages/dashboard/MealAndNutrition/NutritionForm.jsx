import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import Axios from "@/configs/Axios";
import { fetchUsers } from "@/redux/userSlice";
import AddNutritionForm from "./AddNutritionForm";
import toast from "react-hot-toast";

const Nutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [editNutrition, setEditNutrition] = useState(null);
  const [deleteNutritionId, setDeleteNutritionId] = useState(null);
  const { users, loading, error } = useSelector((state) => state.users);
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
    setIsLoading(true);
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
          toast.success("Nutrition plan deleted successfully.");
        }
      })
      .catch((error) => {
        console.error("Error deleting nutrition plan:", error);
        toast.error("Failed to delete nutrition plan.");
      })
      .finally(() => setDeleteNutritionId(null));
      fetchNutritionData();
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
            {/* Display loader when data is being fetched */}
            {loading || isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            ) : (
              nutritionData.map((user) => (
                <div key={user.userId} className="border-b pb-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 rounded-lg"
                    onClick={() => toggleAccordion(user.userId)}
                  >
                    <Typography variant="h6" className="text-gray-700">
                      {user?.userDetails?.name}
                    </Typography>
                    {expandedUserId === user.userId ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  {expandedUserId === user.userId && (
                    <div className="mt-4">
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
          </CardBody>
        ) : (
          <AddNutritionForm
            onAddNutrition={handleAddNutrition}
            users={users}
            loading={loading}
            error={error}
            handleCancel={handleCancel}
            editData={editNutrition}
          />
        )}
      </Card>

      {/* Delete confirmation dialog */}

      {/* {console.log(deleteNutritionId, '=================deleteNutritionId============')} */}
      {deleteNutritionId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Typography variant="h6" className="mb-4">
              Are you sure you want to delete this nutrition plan?
            </Typography>
            <div className="flex justify-end space-x-4">
              <Button
                color="red"
                onClick={() => setDeleteNutritionId(null)}
              >
                Cancel
              </Button>
              <Button
                color="green"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;

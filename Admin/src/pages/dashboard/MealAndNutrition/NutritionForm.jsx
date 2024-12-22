import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchUsers } from "@/redux/userSlice";
import AddNutritionForm from "./AddNutritionForm";

const Nutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowForm(false); // Hide the form when canceled
  };

  useEffect(() => {
    dispatch(fetchUsers({}));

    axios
      .get("http://43.204.2.84:7200/admin/nutrition")
      .then((response) => {
        if (response.data.status === "success") {
          setNutritionData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching nutrition data:", error);
      });
  }, [dispatch]);

  const handleAddNutrition = (newNutrition) => {
    setNutritionData((prevState) => [...prevState, newNutrition]);
    setShowForm(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center">
      <Card className="w-full max-w-6xl shadow-lg mb-6">
        <CardHeader variant="gradient" className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center">
          <Typography variant="h5" color="white">Nutrition Plans</Typography>
          <Button color="lightBlue" onClick={() => setShowForm(true)}>Add Nutrition</Button>
        </CardHeader>
        {!showForm ? (
          <CardBody className="p-6 space-y-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">
                    Sr. No.
                  </th>
                  <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">
                    User
                  </th>
                  <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">
                    Meal Time
                  </th>
                  <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">
                    Dose
                  </th>
                  <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {nutritionData.map((nutrition, index) => (
                  <tr key={nutrition._id} className="border-t">
                    <td className="px-6 py-2 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-2 text-sm text-gray-600">{nutrition.userId}</td>
                    <td className="px-6 py-2 text-sm text-gray-600">{nutrition.mealTime}</td>
                    <td className="px-6 py-2 text-sm text-gray-600">{nutrition.dose}</td>
                    <td className="px-6 py-2 text-sm text-gray-600">{nutrition.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        )
          :
          <>
            <AddNutritionForm
              onAddNutrition={handleAddNutrition}
              users={users}
              loading={loading}
              error={error}
              handleCancel={handleCancel}
            />
          </>
        }
      </Card>
    </div>
  );
};

export default Nutrition;

import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, Typography, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import axios from "axios"; // Or use your preferred API library

const Nutrition = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nutritionData, setNutritionData] = useState([]);

  // Fetch nutrition data on component mount
  useEffect(() => {
    axios.get("http://43.204.2.84:7200/admin/nutrition")
      .then(response => {
        if (response.data.status === "success") {
          setNutritionData(response.data.data);
        }
      })
      .catch(error => {
        console.error("Error fetching nutrition data:", error);
      });
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setTitle("");
    setDescription("");
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    if (!title || !description) return;

    const nutrition = { title, description };

    // POST request to add nutrition
    axios.post("http://43.204.2.84:7200/admin/nutrition", nutrition)
      .then(response => {
        if (response.data.status === "success") {
          // Update the local state with new nutrition data
          setNutritionData(prevState => [...prevState, response.data.data]);
          handleCloseDialog();
        }
      })
      .catch(error => {
        console.error("Error submitting nutrition:", error);
      });
  };

  return (
    <div className="mt-12 mb-8 flex justify-center">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader variant="gradient" className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center">
          <Typography variant="h5" color="white">Nutrition Plans</Typography>
          <Button color="lightBlue" onClick={handleOpenDialog}>Add Nutrition</Button>
        </CardHeader>
        <CardBody className="p-6 space-y-6">
          {/* Nutrition Data Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Sr. No.</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through each nutrition plan */}
              {nutritionData.map((nutrition, index) => (
                <tr key={nutrition._id} className="border-t">
                  <td className="px-6 py-2 text-sm text-gray-600">{index + 1}</td> {/* Sr. No. */}
                  <td className="px-6 py-2 text-sm text-gray-600">{nutrition.title}</td> {/* Title */}
                  <td className="px-6 py-2 text-sm text-gray-600">{nutrition.description}</td> {/* Description */}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Add Nutrition Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
        <DialogBody>
          <div className="space-y-4">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleCloseDialog}>Cancel</Button>
          <Button color="green" onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Nutrition;

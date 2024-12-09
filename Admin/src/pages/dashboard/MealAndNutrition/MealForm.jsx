import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, Typography, Dialog, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";
import axios from "axios"; // Or use your preferred API library

const Meal = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [category, setCategory] = useState("");
    const [item, setItem] = useState("");
    const [mealData, setMealData] = useState({
        breakfast: [],
        dinner: [],
        evening_snacks: [],
        lunch: [],
        morning_snacks: [],
        wake_up_food: [],
    });

    // Fetch meal data on component mount
    useEffect(() => {
        axios.get("http://43.204.2.84:7200/admin/meal")
            .then(response => {
                if (response.data.status === "success") {
                    setMealData(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching meal data:", error);
            });
    }, []);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setCategory("");
        setItem("");
        setOpenDialog(false);
    };

    const handleSubmit = async () => {
        if (!category || !item) return;

        const meal = { category, item };

        // POST request to add meal
        axios.post("http://43.204.2.84:7200/admin/meal", meal)
            .then(response => {
                if (response.data.status === "success") {
                    // Update the local state with new meal data
                    setMealData(prevState => {
                        return {
                            ...prevState,
                            [category]: [...prevState[category], { item }]
                        };
                    });
                    handleCloseDialog();
                }
            })
            .catch(error => {
                console.error("Error submitting meal:", error);
            });
    };

    return (
        <div className="mt-12 mb-8 flex justify-center">
            <Card className="w-full max-w-6xl shadow-lg">
                <CardHeader variant="gradient" className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center">
                    <Typography variant="h5" color="white">Meal</Typography>
                    <Button color="lightBlue" onClick={handleOpenDialog}>Add Meal</Button>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    {/* Meal Data Table */}
                    {Object.keys(mealData).map((categoryKey) => (
                        mealData[categoryKey].length > 0 && (
                            <div key={categoryKey} className="space-y-4">
                                <Typography className="text-lg font-semibold text-gray-800">{categoryKey.replace("_", " ").toUpperCase()}</Typography>
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Sr. No.</th>
                                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Loop through each meal item within this category */}
                                        {mealData[categoryKey].map((meal, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-6 py-2 text-sm text-gray-600">{index + 1}</td> {/* Sr. No. */}
                                                <td className="px-6 py-2 text-sm text-gray-600">{meal.item}</td> {/* Item */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ))}
                </CardBody>
            </Card>

            {/* Add Meal Dialog */}
            <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
                <DialogBody>
                    <div className="space-y-4">
                        <Select label="Category" onChange={setCategory} value={category}>
                            <Option value="breakfast">Breakfast</Option>
                            <Option value="dinner">Dinner</Option>
                            <Option value="evening_snacks">Evening Snacks</Option>
                            <Option value="lunch">Lunch</Option>
                            <Option value="morning_snacks">Morning Snacks</Option>
                            <Option value="wake_up_food">Wake Up Food</Option>
                        </Select>
                        <Input
                            label="Meal Item"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
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

export default Meal;

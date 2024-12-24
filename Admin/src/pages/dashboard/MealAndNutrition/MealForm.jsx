import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, Typography, Dialog, DialogBody, DialogFooter, Input, Select, Option, CircularProgress, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import Axios from "@/configs/Axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Meal = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [category, setCategory] = useState("");
    const [item, setItem] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [mealData, setMealData] = useState([]);
    const [editMeal, setEditMeal] = useState(null); // For editing a meal
    const [openAccordions, setOpenAccordions] = useState({}); // State to control which accordion is open

    const { users, loading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({}));
    }, [dispatch]);

    useEffect(() => {
        fetchMealData(); // Fetch meal data on component mount
    }, []);

    // Function to re-fetch meal data
    const fetchMealData = () => {
        Axios.get("/admin/meal")
            .then((response) => {
                if (response.data.status === "success") {
                    setMealData(response.data.data); // Update state with new meal data
                }
            })
            .catch((error) => {
                console.error("Error fetching meal data:", error);
            });
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setCategory("");
        setItem("");
        setSelectedUserId(null);
        setOpenDialog(false);
        setEditMeal(null);
    };

    const handleSubmit = async () => {
        if (!category || !item || !selectedUserId) return;

        const meal = { category, item, userId: selectedUserId };

        if (editMeal) {
            // Update meal
            Axios.put(`/admin/meal/${editMeal.itemId}`, meal)
                .then((response) => {
                    if (response.data.status === "success") {
                        // Re-fetch meal data after successful update
                        fetchMealData();
                        handleCloseDialog();
                    }
                })
                .catch((error) => {
                    console.error("Error updating meal:", error);
                    toast.error("Error updating meal.");
                });
        } else {
            // Add new meal
            Axios.post("/admin/meal", meal)
                .then((response) => {
                    if (response.data.status === "success") {
                        // Re-fetch meal data after successful addition
                        fetchMealData();
                        handleCloseDialog();
                    }
                })
                .catch((error) => {
                    console.error("Error submitting meal:", error);
                    toast.error("Error adding meal.");
                });
        }
    };

    const handleDelete = (mealId) => {
        Axios.delete(`/admin/meal/${mealId}`)
            .then((response) => {
                if (response.data.status === "success") {
                    // Re-fetch meal data after successful deletion
                    fetchMealData();
                    toast.success("Meal deleted successfully.");
                }
            })
            .catch((error) => {
                console.error("Error deleting meal:", error);
                toast.error("Error deleting meal.");
            });
    };

    // Toggle Accordion open state
    const handleAccordionToggle = (userId) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId], // Toggle the state of this accordion
        }));
    };

    return (
        <div className="mt-12 mb-8 flex justify-center">
            <Card className="w-full max-w-6xl shadow-lg">
                <CardHeader variant="gradient" className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center">
                    <Typography variant="h5" color="white">
                        Meal
                    </Typography>
                    <Button color="lightBlue" onClick={handleOpenDialog}>
                        Add Meal
                    </Button>
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    {/* Accordion for each user */}
                    {mealData.length > 0 && mealData.map((userMeals, index) => (
                        <Accordion key={userMeals.userId} open={openAccordions[userMeals.userId]}>
                            <AccordionHeader onClick={() => handleAccordionToggle(userMeals.userId)}>
                                <Typography variant="h6" color="gray-700">
                                    {index + 1}. {userMeals.name}
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody>
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Category</th>
                                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Loop through the user's meals */}
                                        {Object.keys(userMeals.meals).map((categoryKey) => (
                                            userMeals.meals[categoryKey].length > 0 && (
                                                userMeals.meals[categoryKey].map((meal) => (
                                                    <tr key={meal.itemId} className="border-t">
                                                        <td className="px-6 py-2 text-sm text-gray-600">{categoryKey}</td>
                                                        <td className="px-6 py-2 text-sm text-gray-600">{meal.itemName}</td>
                                                        <td className="px-6 py-2 text-sm text-gray-600 flex space-x-2">
                                                            <PencilIcon
                                                                className="h-5 w-5 text-blue-500 cursor-pointer"
                                                                onClick={() => {
                                                                    setCategory(categoryKey);
                                                                    setItem(meal.itemName);
                                                                    setSelectedUserId(userMeals.userId);
                                                                    setEditMeal(meal);
                                                                    handleOpenDialog();
                                                                }}
                                                            />
                                                            <TrashIcon
                                                                className="h-5 w-5 text-red-500 cursor-pointer"
                                                                onClick={() => handleDelete(meal.itemId)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </AccordionBody>
                        </Accordion>
                    ))}
                </CardBody>
            </Card>

            {/* Add Meal Dialog */}
            <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
                <DialogBody>
                    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                        <Typography className="text-lg font-semibold text-gray-800">Add or Edit Meal</Typography>

                        <Select label="Select User" onChange={setSelectedUserId} value={selectedUserId}>
                            {users.map((user) => (
                                <Option key={user._id} value={user._id}>
                                    {user.name}
                                </Option>
                            ))}
                        </Select>

                        <Select label="Select Category" onChange={setCategory} value={category}>
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
                            className="text-lg"
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="green" onClick={handleSubmit} >
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Meal;

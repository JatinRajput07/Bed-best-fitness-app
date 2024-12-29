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
    const [selectedUserId, setSelectedUserId] = useState("");
    const [mealData, setMealData] = useState([]);
    const [filteredMealData, setFilteredMealData] = useState([]); // For filtered data
    const [editMeal, setEditMeal] = useState(null);
    const [openAccordions, setOpenAccordions] = useState({});
    const [searchQuery, setSearchQuery] = useState(""); // Search query
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [pageSize, setPageSize] = useState(5); // Number of items per page

    const { users, loading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({}));
    }, [dispatch]);

    useEffect(() => {
        fetchMealData();
    }, []);

    useEffect(() => {
        handleSearch(searchQuery); // Filter data on search query change
    }, [mealData, searchQuery]);

    const fetchMealData = () => {
        Axios.get("/admin/meal")
            .then((response) => {
                if (response.data.status === "success") {
                    setMealData(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching meal data:", error);
            });
    };

    const handleSearch = (query) => {
        if (!query) {
            setFilteredMealData(mealData);
        } else {
            const filtered = mealData.filter((userMeals) =>
                userMeals.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMealData(filtered);
            setCurrentPage(1); // Reset to the first page on a new search
        }
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setCategory("");
        setItem("");
        setSelectedUserId("");
        setOpenDialog(false);
        setEditMeal(null);
    };

    const handleSubmit = async () => {
        if (!category || !item || !selectedUserId) return;

        const meal = { category, item, userId: selectedUserId };

        if (editMeal) {
            Axios.put(`/admin/meal/${editMeal.itemId}`, meal)
                .then((response) => {
                    if (response.data.status === "success") {
                        fetchMealData();
                        handleCloseDialog();
                    }
                })
                .catch((error) => {
                    console.error("Error updating meal:", error);
                    toast.error("Error updating meal.");
                });
        } else {
            Axios.post("/admin/meal", meal)
                .then((response) => {
                    if (response.data.status === "success") {
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
                    fetchMealData();
                    toast.success("Meal deleted successfully.");
                }
            })
            .catch((error) => {
                console.error("Error deleting meal:", error);
                toast.error("Error deleting meal.");
            });
    };

    const handleAccordionToggle = (userId) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    };

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const currentPageData = filteredMealData.slice(startIndex, startIndex + pageSize);

    const totalPages = Math.ceil(filteredMealData.length / pageSize);

    return (
        <div className="mt-12 mb-8 flex justify-center">
            <Card className="w-full max-w-6xl shadow-lg">
                <CardHeader variant="gradient" className="bg-gradient-to-r from-red-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center">
                    <Typography variant="h5" color="white">Meal</Typography>
                    
                        
                        <Button color="lightBlue" onClick={handleOpenDialog}>Add Meal</Button>
                    
                </CardHeader>
                <div className="flex justify-between items-center mb-4 mt-3 px-4">
                <Input
                            placeholder="Search by user name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-1/2"
                        />
                </div>
              
                <CardBody className="p-6 space-y-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                        </div>
                    ) : (
                        currentPageData.length > 0 ? (
                            currentPageData.map((userMeals) => (
                                <Accordion key={userMeals.userId} open={openAccordions[userMeals.userId]}>
                                    <AccordionHeader onClick={() => handleAccordionToggle(userMeals.userId)}>
                                        <Typography variant="h6" color="gray-700">{userMeals.name}</Typography>
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
                                                {Object.keys(userMeals.meals).map((categoryKey) =>
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
                                                )}
                                            </tbody>
                                        </table>
                                    </AccordionBody>
                                </Accordion>
                            ))
                        ) : (
                            <Typography>No meals found.</Typography>
                        )
                    )}
                </CardBody>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 mt-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => handlePagination(i + 1)}
                            variant={currentPage === i + 1 ? "gradient" : "text"}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Add/Edit Meal Dialog */}
            <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
                <DialogBody>
                    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                        <Typography className="text-lg font-semibold text-gray-800">Add or Edit Meal</Typography>
                        <select disabled={!!editMeal} className="bg-gray-100 border-2 h-10 rounded-[7px] w-full" onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
                            <option>Select User</option>
                            {users.filter((user) => user.role === "user").map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name ? user.name : user.email}
                                </option>
                            ))}
                        </select>
                        <Select disabled={!!editMeal} label="Select Category" onChange={setCategory} value={category}>
                            <Option value="breakfast">Breakfast</Option>
                            <Option value="dinner">Dinner</Option>
                            <Option value="evening_snacks">Evening Snacks</Option>
                            <Option value="lunch">Lunch</Option>
                            <Option value="morning_snacks">Morning Snacks</Option>
                            <Option value="wake_up_food">Wake Up Food</Option>
                        </Select>
                        <Input label="Meal Item" value={item} onChange={(e) => setItem(e.target.value)} required className="text-lg" />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="green" onClick={handleSubmit}>
                        {loading ? <CircularProgress size={24} /> : "Submit"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Meal;

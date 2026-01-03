import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Typography,
    Dialog,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Spinner,
    Accordion,
    AccordionHeader,
    AccordionBody,
    DialogHeader,
    IconButton,
    Chip,
} from "@material-tailwind/react";
import Axios from "@/configs/Axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const CATEGORY_SEQUENCE = [
    "wake_up_food",
    "breakfast",
    "morning_snacks",
    "lunch",
    "evening_snacks",
    "dinner",
];

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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteMealId, setDeleteMealId] = useState(null);

    const handleOpenDeleteDialog = (mealId) => {
        setDeleteMealId(mealId);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setDeleteMealId(null);
    };

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

    function formatMealName(input) {
        const categoryMap = {
            wake_up_food: "Early Morning (Wake-up Meal)",
            breakfast: "Breakfast (Power Breakfast)",
            morning_snacks: "Mid-Morning Snack (Energy Bites)",
            lunch: "Lunch (Fuel Plate)",
            evening_snacks: "Evening Snack (Refresh & Recharge)",
            dinner: "Dinner (Light & Right)",
        };

        return (
            categoryMap[input] ||
            input
                .trim()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
        );
    }

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        setCategory("");
        setItem("");
        setSelectedUserId("");
        setOpenDialog(false);
        setEditMeal(null);
    };

    const handleSubmit = async () => {
        // If updating, category is prefilled. If new, need to check.
        // However, the original logic for new meal required these 3.
        // For update, values are state-bound, so check remains.
        if (!category || !item || !selectedUserId) {
            toast.error("Please fill all fields");
            return;
        }

        const meal = { category, item, userId: selectedUserId };

        if (editMeal) {
            Axios.put(`/admin/meal/${editMeal.itemId}`, meal)
                .then((response) => {
                    if (response.data.status === "success") {
                        fetchMealData();
                        handleCloseDialog();
                        toast.success("Meal updated successfully");
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
                        toast.success("Meal added successfully");
                    }
                })
                .catch((error) => {
                    console.error("Error submitting meal:", error);
                    toast.error("Error adding meal.");
                });
        }
    };

    const confirmDelete = () => {
        if (deleteMealId) {
            Axios.delete(`/admin/meal/${deleteMealId}`)
                .then((response) => {
                    if (response.data.status === "success") {
                        fetchMealData();
                        toast.success("Meal deleted successfully.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting meal:", error);
                    toast.error("Error deleting meal.");
                })
                .finally(() => {
                    handleCloseDeleteDialog();
                });
        }
    };
    const handleAccordionToggle = (userId) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    };

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const currentPageData = filteredMealData.slice(
        startIndex,
        startIndex + pageSize
    );

    const totalPages = Math.ceil(filteredMealData.length / pageSize);

    // Filter valid user options
    const userOptions = users.filter((user) => user.role === "user");

    return (
        <div className="mt-12 mb-8 flex justify-center px-4">
            <Card className="w-full max-w-6xl shadow-xl rounded-xl border border-blue-gray-100">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 p-6 rounded-t-xl from-blue-900 to-blue-700 shadow-md flex justify-between items-center"
                >
                    <Typography variant="h4" color="white" className="font-bold tracking-wide">
                        Meal Plans
                    </Typography>

                    <Button
                        size="sm"
                        color="white"
                        variant="text"
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white shadow-none hover:shadow-none"
                        onClick={handleOpenDialog}
                    >
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Meal
                    </Button>
                </CardHeader>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-4 gap-4 px-6">
                    <div className="w-full md:w-96">
                        <Input
                            label="Search by user name"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <CardBody className="px-6 pb-6 pt-2 min-h-[500px]">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spinner className="h-10 w-10" color="blue" />
                        </div>
                    ) : currentPageData.length > 0 ? (
                        <div className="space-y-4">
                            {currentPageData.map((userMeals) => (
                                <Accordion
                                    key={userMeals.userId}
                                    open={openAccordions[userMeals.userId]}
                                    className="border border-blue-gray-100 rounded-lg px-4 bg-white shadow-sm"
                                    icon={
                                        <div className={`transition-transform duration-300 ${openAccordions[userMeals.userId] ? "rotate-180" : ""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-blue-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                    }
                                >
                                    <AccordionHeader
                                        onClick={() => handleAccordionToggle(userMeals.userId)}
                                        className="border-b-0 py-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold uppercase">
                                                {userMeals.name ? userMeals.name.charAt(0) : "U"}
                                            </div>
                                            <Typography variant="h6" color="blue-gray" className="font-semibold">
                                                {userMeals.name}
                                            </Typography>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody className="pt-0 pb-4">
                                        <div className="overflow-x-auto rounded-lg border border-blue-gray-50">
                                            <table className="w-full min-w-max table-auto text-left">
                                                <thead>
                                                    <tr className="bg-blue-gray-50/50">
                                                        <th className="p-4 border-b border-blue-gray-100">
                                                            <Typography variant="small" color="blue-gray" className="font-bold opacity-70">
                                                                Category
                                                            </Typography>
                                                        </th>
                                                        <th className="p-4 border-b border-blue-gray-100">
                                                            <Typography variant="small" color="blue-gray" className="font-bold opacity-70">
                                                                Item
                                                            </Typography>
                                                        </th>
                                                        <th className="p-4 border-b border-blue-gray-100 text-center">
                                                            <Typography variant="small" color="blue-gray" className="font-bold opacity-70">
                                                                Actions
                                                            </Typography>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CATEGORY_SEQUENCE.map((categoryKey) => {
                                                        if (userMeals.meals[categoryKey]) {
                                                            return userMeals.meals[categoryKey].map((meal, index) => {
                                                                const isLast = index === userMeals.meals[categoryKey].length - 1;
                                                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                                                return (
                                                                    <tr key={meal.itemId} className="hover:bg-blue-gray-50/20 transition-colors">
                                                                        <td className={classes}>
                                                                            <Chip
                                                                                value={formatMealName(categoryKey)}
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                color="blue"
                                                                                className="rounded-full w-fit capitalize font-medium"
                                                                            />
                                                                        </td>
                                                                        <td className={classes}>
                                                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                                                {meal.itemName}
                                                                            </Typography>
                                                                        </td>
                                                                        <td className={classes}>
                                                                            <div className="flex justify-center gap-2">
                                                                                <IconButton
                                                                                    variant="text"
                                                                                    color="blue"
                                                                                    size="sm"
                                                                                    onClick={() => {
                                                                                        setCategory(categoryKey);
                                                                                        setItem(meal.itemName);
                                                                                        setSelectedUserId(userMeals.userId);
                                                                                        setEditMeal(meal);
                                                                                        handleOpenDialog();
                                                                                    }}
                                                                                >
                                                                                    <PencilIcon className="h-4 w-4" />
                                                                                </IconButton>
                                                                                <IconButton
                                                                                    variant="text"
                                                                                    color="red"
                                                                                    size="sm"
                                                                                    onClick={() => handleOpenDeleteDialog(meal.itemId)}
                                                                                >
                                                                                    <TrashIcon className="h-4 w-4" />
                                                                                </IconButton>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            });
                                                        }
                                                        return null;
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-10 h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <Typography variant="h5" color="blue-gray" className="mb-2">No meals found</Typography>
                            <Typography color="gray" className="font-normal">Try adjusting your search or add a new meal plan.</Typography>
                        </div>
                    )}
                </CardBody>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-2 mb-6 border-t border-blue-gray-50 pt-4">
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2"
                        onClick={() => handlePagination(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        size="sm"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <IconButton
                                key={i + 1}
                                variant={currentPage === i + 1 ? "gradient" : "text"}
                                color={currentPage === i + 1 ? "blue" : "blue-gray"}
                                onClick={() => handlePagination(i + 1)}
                                size="sm"
                            >
                                {i + 1}
                            </IconButton>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2"
                        onClick={() => handlePagination(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        size="sm"
                    >
                        Next
                    </Button>
                </div>
            </Card>

            {/* Add/Edit Meal Dialog */}
            <Dialog
                open={openDialog}
                handler={handleCloseDialog}
                size="sm"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                className="shadow-2xl"
            >
                <DialogHeader className="bg-blue-600 text-white rounded-t-lg flex justify-center py-4">
                    <Typography variant="h5" color="white" className="font-semibold">
                        {editMeal ? "Update Meal Plan" : "Add New Meal"}
                    </Typography>
                </DialogHeader>
                <DialogBody className="flex flex-col gap-6 p-8">
                    <Typography className="-mb-2" variant="h6">
                        Select User
                    </Typography>
                    <Select
                        label="Choose User"
                        value={selectedUserId}
                        onChange={(val) => setSelectedUserId(val)}
                        disabled={!!editMeal}
                        size="lg"
                        color="blue"
                    >
                        {userOptions.length > 0 ? userOptions.map((user) => (
                            <Option key={user._id} value={user._id}>
                                {user.name || user.email}
                            </Option>
                        )) : <Option value="" disabled>No users found</Option>}
                    </Select>

                    <Typography className="-mb-2" variant="h6">
                        Meal Category
                    </Typography>
                    <Select
                        label="Select Category"
                        value={category}
                        onChange={(val) => setCategory(val)}
                        className="w-full"
                        size="lg"
                        color="blue"
                    >
                        {CATEGORY_SEQUENCE.map((categoryKey) => (
                            <Option key={categoryKey} value={categoryKey}>
                                {formatMealName(categoryKey)}
                            </Option>
                        ))}
                    </Select>

                    <Typography className="-mb-2" variant="h6">
                        Meal Item
                    </Typography>
                    <Input
                        size="lg"
                        label="Enter meal item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        required
                        color="blue"
                    />
                </DialogBody>
                <DialogFooter className="space-x-2 border-t border-gray-100 p-4">
                    <Button variant="text" color="blue-gray" onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSubmit}>
                        {loading ? <Spinner className="h-5 w-5" color="white" /> : "Save Changes"}
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                handler={handleCloseDeleteDialog}
                size="xs"
                className="shadow-xl"
            >
                <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <TrashIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Delete Meal?
                    </Typography>
                    <Typography className="mb-6 font-normal text-gray-600">
                        Are you sure you want to delete this meal item? This action cannot be undone.
                    </Typography>
                    <div className="flex justify-center gap-4">
                        <Button
                            variant="text"
                            color="blue-gray"
                            onClick={handleCloseDeleteDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="gradient"
                            color="red"
                            onClick={confirmDelete}
                        >
                            Yes, Delete
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Meal;

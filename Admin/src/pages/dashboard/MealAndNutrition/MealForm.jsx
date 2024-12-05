import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

const MealForm = ({ open, onClose, onSubmit }) => {
    const [mealData, setMealData] = useState({
        wakeupWater: [],
        breakfast: [],
        lunch: [],
        dinner: [],
        morningSnack: [],
        eveningSnack: [],
    });

    const [tempInput, setTempInput] = useState({ field: "", value: "" });

    const handleAddItem = () => {
        const { field, value } = tempInput;
        if (!field || !value) return;
        setMealData({
            ...mealData,
            [field]: [...mealData[field], value],
        });
        setTempInput({ field: "", value: "" });
    };

    const handleRemoveItem = (field, index) => {
        setMealData({
            ...mealData,
            [field]: mealData[field].filter((_, i) => i !== index),
        });
    };

    const handleSubmit = () => {
        onSubmit(mealData);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
                <Typography variant="h5" className="mb-4 text-center font-medium">
                    Add Meal Plan
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["wakeupWater", "breakfast", "morningSnack", "lunch", "eveningSnack", "dinner"].map(
                        (field) => (
                            <div key={field} className="flex flex-col gap-3">
                                <Typography variant="h6" className="font-medium">
                                    {field.replace(/([A-Z])/g, " $1")}
                                </Typography>
                                <ul className="bg-gray-100 p-3 rounded shadow-sm">
                                    {mealData[field].length > 0 ? (
                                        mealData[field].map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between bg-white p-2 rounded mb-2 shadow-sm"
                                            >
                                                <span>{item}</span>
                                                <button
                                                    onClick={() => handleRemoveItem(field, index)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <Typography variant="small" className="text-gray-500">
                                            No items added yet.
                                        </Typography>
                                    )}
                                </ul>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        size="md"
                                        placeholder={`Add to ${field.replace(/([A-Z])/g, " $1")}`}
                                        value={tempInput.field === field ? tempInput.value : ""}
                                        onChange={(e) =>
                                            setTempInput({ field, value: e.target.value })
                                        }
                                    />
                                    <Button
                                        onClick={handleAddItem}
                                        size="sm"
                                        color="green"
                                        className="min-w-fit"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Button onClick={onSubmit} color="blue">
                        Submit Meal Plan
                    </Button>
                    <Button onClick={onClose} color="red">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MealForm;

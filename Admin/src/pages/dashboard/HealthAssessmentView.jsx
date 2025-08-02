import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
    Card,
    CardBody
} from "@material-tailwind/react";
import { format } from "date-fns";

export const HRADetailView = ({ record, onClose }) => {
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "dd MMMM yyyy 'at' hh:mm a");
        } catch {
            return "Invalid Date";
        }
    };

    const renderTextInput = (value, placeholder = "Not provided") => {
        return (
            <Input
                value={value || placeholder}
                disabled
                className={`!border-blue-gray-200 ${value ? "!text-gray-900" : "!text-gray-500 italic"}`}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin={undefined}
            />
        );
    };

    const questions = [
        {
            key: "name",
            label: "NAME *",
            icon: "👤",
            category: "Basic Information"
        },
        {
            key: "mobileNumber",
            label: "MOBILE NUMBER *",
            icon: "📱",
            category: "Basic Information"
        },
        {
            key: "mainObjective",
            label: "WHAT IS YOUR MAIN OBJECTIVE TO JOIN BE-D-BEST COMMUNITY ?",
            icon: "🎯",
            category: "Health Goals"
        },
        {
            key: "healthConditions",
            label: "DO YOU FACE ANY OF THE BELOW HEALTH CONDITIONS / SYMPOTMS?",
            icon: "🏥",
            category: "Health Status"
        },
        {
            key: "habits",
            label: "ANY OF THESE BELOW HABITS YOU CAN RELATE WITH? *",
            icon: "🔄",
            category: "Lifestyle"
        },
        {
            key: "waterIntake",
            label: "YOUR APPROXIMATE WATER INTAKE THROUGHOUT THE DAY.",
            icon: "💧",
            category: "Lifestyle"
        },
        {
            key: "screenTime",
            label: "YOUR APPROXIMATE LAPTOP/MOBILE SCREEN TIMING THROUGHOUT THE DAY?",
            icon: "🖥️",
            category: "Lifestyle"
        },
        {
            key: "RATE YOUR SLEEPING CONDITION.",
            label: "RATE YOUR SLEEPING CONDITION *",
            icon: "😴",
            category: "Lifestyle"
        },
        {
            key: "exerciseDays",
            label: "HOW MANY DAYS A WEEK YOU DO ANY TYPE OF EXERCISE FOR MINIMUM 30mins ?  (WALKING, CYCLING, RUNNING, GYM, YOGA.. ETC)",
            icon: "🏋️",
            category: "Fitness"
        },
        {
            key: "currentTreatments",
            label: "ANY OF THE BELOW TREATMENT / MEDICINES GOING ON RIGHT NOW. *",
            icon: "💊",
            category: "Health Status"
        },
        {
            key: "weight_hight",
            label: "YOUR CURRENT WEIGHT in kg AND HEIGHT in cm",
            icon: "📏",
            category: "Body Metrics"
        },
        {
            key: "nutritionalSupplements",
            label: "ANY OF THE NUTRITIONAL SUPPLEMENTS YOU ARE CONSUMING RIGHT NOW?",
            icon: "🥗",
            category: "Nutrition"
        },
        {
            key: "additionalInfo",
            label: "ANYTHING ELSE YOU WANT TO SHARE ABOUT YOURSELF. ABOUT YOUR DIET, HABITS, LIFESTYLE, PAST HEALTH CONDITIONS, PAST WEIGHT LOSS EXPERIENCE.... ETC",
            icon: "📝",
            category: "Other"
        },
        {
            key: "bodyMeasurements.hip",
            label: "Body Measurement: Hip (cm)",
            icon: "📐",
            category: "Body Measurements"
        },
        {
            key: "bodyMeasurements.waist",
            label: "Body Measurement: Waist (cm)",
            icon: "📐",
            category: "Body Measurements"
        },
        {
            key: "bodyMeasurements.chest",
            label: "Body Measurement: Chest (cm)",
            icon: "📐",
            category: "Body Measurements"
        },
        {
            key: "bodyMeasurements.thigh",
            label: "Body Measurement: Thigh (cm)",
            icon: "📐",
            category: "Body Measurements"
        },
        {
            key: "bodyMeasurements.arm",
            label: "Body Measurement: Arm (cm)",
            icon: "📐",
            category: "Body Measurements"
        },
    ];

    // Group questions by category
    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.category]) {
            acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
    }, {});

    const getNestedValue = (obj, key) => {
        return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
    };

    return (
        <Dialog open={true} handler={onClose} size="xl" className="max-h-[95vh] overflow-y-auto">
            <DialogHeader className="flex flex-col items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
                <Typography variant="h3" className="font-bold text-white mb-1">
                    BE D BEST
                </Typography>
                <Typography variant="h4" className="bg-white text-blue-800 px-6 py-1 rounded-full shadow-md">
                    HEALTH RISK ASSESSMENT FORM
                </Typography>
                <Typography variant="small" className="text-blue-100 mt-2">
                    Submitted on: {formatDate(record.createdAt)}
                </Typography>
            </DialogHeader>

            <DialogBody className="space-y-8 p-6">
                {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
                    <Card key={category} className="mb-6 border border-blue-gray-100 shadow-sm">
                        <CardBody className="p-4">
                            <Typography variant="h5" color="blue-gray" className="mb-4 pb-2 border-b border-blue-gray-100 flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-800 p-2 rounded-full">
                                    {categoryQuestions[0].icon}
                                </span>
                                {category}
                            </Typography>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categoryQuestions.map((question, index) => {
                                    const value = getNestedValue(record, question.key);
                                    const displayValue = Array.isArray(value)
                                        ? value.length > 0
                                            ? value.join(", ")
                                            : "Not provided"
                                        : value !== null && value !== ""
                                        ? value
                                        : "Not provided";

                                    return (
                                        <div key={index} className="space-y-1">
                                            <Typography variant="small" className="font-medium text-blue-gray-600 flex items-center gap-1">
                                                <span>{question.icon}</span>
                                                {question.label}
                                            </Typography>
                                            {renderTextInput(displayValue)}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </DialogBody>

            <DialogFooter className="px-6 py-4 border-t border-blue-gray-100">
                <Button 
                    variant="gradient" 
                    color="blue" 
                    onClick={onClose}
                    className="rounded-full px-6 shadow-md"
                >
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Reminder must belong to a user."],
    },
    category: {
        type: String,
        enum: ["meal", "water", "steps", "workout", "knowledge", "nutrition"],
        required: [true, "Reminder must have a category."],
    },
    isActive: {
        type: Boolean,
        default: true, // Toggle reminder on/off
    },
    repeatType: {
        type: String,
        enum: ["daily", "custom"],
        default: "daily", // Can be daily or custom days (e.g., Monday, Wednesday)
    },
    timeSettings: {
        mealTimes: {
            wake_up_food: String, // Time in HH:mm format
            breakfast: String,
            morning_snacks: String,
            lunch: String,
            evening_snacks: String,
            dinner: String,
        },
        waterReminder: {
            startTime: String, // Start time in HH:mm
            endTime: String, // End time in HH:mm
            reminderInterval: Number, // e.g., 15 minutes
            reminderCount: Number, // e.g., 7 times
        },
        workoutReminder: {
            startTime: String,
            duration: String, // E.g., 1 hour
        },
        steptReminder: {
            startTime: String,
            duration: String, // E.g., 1 hour
        },
        knowledgeSessionReminder: {
            sessionStartTime: String,
            duration: String, // E.g., 30 minutes
        },
        nutritionReminder: {
            startTime: String,
            duration: String, // E.g., 1 hour
        },
    },
    Days: {
        type: [String], // For custom days like ["Monday", "Wednesday"]
    },
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;

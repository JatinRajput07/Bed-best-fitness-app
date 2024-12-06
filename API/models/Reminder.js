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
    },
    time: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    repeatType: {
        type: String,
        enum: ["daily", "custom"],
        default: "daily",
    },
    meal: {
        wake_up_food: String,
        breakfast: String,
        morning_snacks: String,
        lunch: String,
        evening_snacks: String,
        dinner: String,
    },
    water: {
        oncetime: String,
        startTime: String,
        endTime: String,
        reminderInterval: Number,
        reminderCount: Number,
    },
    workout: [{
        time: String,
        day: String
    }],
    stept: [{
        time: String,
        day: String
    }],
    knowledgeSession: [{
        time: String,
        day: String
    }],
    nutrition: [{
        time: String,
        day: String
    }],
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;

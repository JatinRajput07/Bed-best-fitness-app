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
        required: [true, "Reminder category is required."],
    },
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
        on: { type: Boolean, default: true },
        daily: {
            type: Map,
            of: {
                time: String,
                message: String,
            }, // Map keys: wake_up_food, breakfast, etc.
        },
        custom: [
            {
                day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                meals: {
                    type: Map,
                    of: {
                        time: String,
                        message: String,
                    }, // Map keys: wake_up_food, breakfast, etc.
                },
            },
        ],
    },
    water: {
        on: { type: Boolean, default: true },
        daily: {
            type: {
                singleReminder: {
                    time: String,
                    message: String,
                },
                intervalReminder: {
                    startTime: String,
                    endTime: String,
                    interval: Number, // Interval in minutes
                    message: String,
                },
            },
        },
        custom: [
            {
                day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                reminders: {
                    type: {
                        startTime: String,
                        endTime: String,
                        interval: Number,
                        message: String,
                    },
                },
            },
        ],
    },
    steps: {
        on: { type: Boolean, default: true },
        daily: {
            time: String,
            message: String,
        },
        custom: [
            {
                day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                time: String,
                message: String,
            },
        ],
    },
    workout: {
        on: { type: Boolean, default: true },
        daily: {
            time: String,
            message: String,
        },
        custom: [
            {
                day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                time: String,
                message: String,
            },
        ],
    },
    knowledgeSession: {
        on: { type: Boolean, default: true },
        daily: {
            time: String,
            message: String,
        },
        custom: [
            {
                day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                time: String,
                message: String,
            },
        ],
    },
    nutrition: {
        on: { type: Boolean, default: true },
        daily: {
            time: String,
            message: String,
        },
        custom: [
            {
                day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
                time: String,
                message: String,
            },
        ],
    },
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;

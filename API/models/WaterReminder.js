const mongoose = require('mongoose');

const WaterReminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reminderOn: {
        type: Boolean,
        default: false,
    },
    reminderType: {
        type: String,
        enum: ['once', 'interval', 'custom'],
        default: 'once',
    },
    reminderTime: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    intervalMinutes: {
        type: Number,
        default: 15,
    },
    customTimes: {
        type: Number,
        default: 7,
    },
}, { timestamps: true });

module.exports = mongoose.model('WaterReminder', WaterReminderSchema);

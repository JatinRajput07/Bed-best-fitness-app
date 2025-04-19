const mongoose = require('mongoose');

const MealReminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reminderOn: {
        type: Boolean,
        default: false
    },
    everyTime:{ type: String },
    everyday:{ type: Boolean, default: false },
    meals: {
        wakeupFood: {
            enabled: { type: Boolean, default: false },
            time: { type: String } // Format: "HH:mm"
        },
        breakfast: {
            enabled: { type: Boolean, default: false },
            time: { type: String }
        },
        morningSnacks: {
            enabled: { type: Boolean, default: false },
            time: { type: String }
        },
        lunch: {
            enabled: { type: Boolean, default: false },
            time: { type: String }
        },
        eveningSnacks: {
            enabled: { type: Boolean, default: false },
            time: { type: String }
        },
        dinner: {
            enabled: { type: Boolean, default: false },
            time: { type: String }
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('MealReminder', MealReminderSchema);
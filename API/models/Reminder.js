const { default: mongoose } = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reminderOn: { type: Boolean, default: false },
    reminder_type: {  type: String },
    reminderType: { type: String, enum: ['once', 'everyday', 'specificDays'], default: 'once' },
    onceTime: { type: String, default: '' },
    everydayTime: { type: String, default: '' },
    weeklyTimes: {
        monday: { type: String, default: '' },
        tuesday: { type: String, default: '' },
        wednesday: { type: String, default: '' },
        thursday: { type: String, default: '' },
        friday: { type: String, default: '' },
        saturday: { type: String, default: '' },
        sunday: { type: String, default: '' }
    }
});

module.exports = mongoose.model('Reminder', reminderSchema);
const mongoose = require('mongoose');

const healthAssessmentSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Name is required'],
        trim: true,
    },
    mobileNumber: {
        type: String,
        // required: [true, 'Mobile number is required'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    mainObjective: {
        type: [String],
        // required: [true, 'Main objective is required'],
    },
    healthConditions: {
        type: [String],
        // required: [true, 'At least one health condition must be selected'],
    },
    habits: {
        type: [String],
        // required: [true, 'At least one habit must be selected'],
    },
    waterIntake: {
        type: [String],
        // required: [true, 'Water intake is required'],
    },
    screenTime: {
        type: [String],
        // required: [true, 'Screen time is required'],
    },
    sleepCondition: {
        type: [String],
        // required: [true, 'Sleep condition is required'],
    },
    exerciseDays: {
        type: [String],
        // required: [true, 'Exercise days per week is required'], 
        // min: [0, 'Exercise days cannot be negative'],
        // max: [7, 'Exercise days cannot exceed 7'],
    },
    currentTreatments: {
        type: [String],
    },
    weight_hight: {
        type: String,
    },

    nutritionalSupplements: {
        type: String,
        default: [],
    },
    additionalInfo: {
        type: String,
        trim: true,
    },
    bodyMeasurements: {
        hip: { type: Number },
        waist: { type: Number },
        chest: { type: Number },
        thigh: { type: Number },
        arm: { type: Number },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('HealthAssessment', healthAssessmentSchema);
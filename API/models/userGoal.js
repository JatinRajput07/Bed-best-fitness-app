const { startsWith } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    weightGoal: {
        currentWeight: { type: Number, default: 0 },
        startsWeight: { type: Number, default: 0 },
        goalWeight: { type: Number, default: 0 },
        weightGoalDescription: { type: String },
        activityLevel: { type: String }
    },
    nutritionGoals: {
        dailyCalorieBudget: { type: String },
        macronutrientsBudget: {
            protein: { type: String },
            fats: { type: String },
            carbs: { type: String },
            fiber: { type: String }
        }
    },
    dailyWaterGoal: { type: Number },
    dailyStepsGoal: { type: Number }
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;

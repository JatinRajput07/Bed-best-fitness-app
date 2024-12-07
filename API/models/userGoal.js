const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    weightGoal: {
        currentWeight: { type: Number },
        goalWeight: { type: Number },
        weightGoalDescription: { type: String }, // e.g., "Gain 12.0 kg in 25 Weeks"
        activityLevel: { type: String } // e.g., "Sedentary"    
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
    dailyWaterGoal: { type: Number } ,// e.g., 6 glasses
    dailyStepsGoal: { type: Number } // e.g., 10,000 steps
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;

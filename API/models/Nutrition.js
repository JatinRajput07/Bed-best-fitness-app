const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema(
    {
        coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        
        mealTime: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Night'],
            required: true,
        },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        active: { type: Boolean, default: true },
        status: { type: Number, default: 0 }   // 0 is inProgress , 1 is Completed
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Nutrition', nutritionSchema);

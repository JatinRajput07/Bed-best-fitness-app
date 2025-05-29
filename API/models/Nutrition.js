const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema(
    {
        coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
        mealTime: {
            type: String,
            required: true,
        },
        description: { type: String, required: false },
        name:String,
        quantity: { type: Number, required: true },
        active: { type: Boolean, default: true },
        status: { type: Number, default: 0 } 
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Nutrition', nutritionSchema);

const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mealTime: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Night'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Nutrition', nutritionSchema);

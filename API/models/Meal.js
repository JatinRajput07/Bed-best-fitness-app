
const mongoose = require('mongoose')


const mealSchema = mongoose.Schema({
    coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: String,
    item: String,
    active: { type: Boolean, default: true }
}, {
    timestamps: true
})


module.exports = mongoose.model('Meal', mealSchema)


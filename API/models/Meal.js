
const mongoose = require('mongoose')


const mealSchema = mongoose.Schema({
    category: String,
    item: String,
    active: { type: Boolean, default: true }
}, {
    timestamps: true
})


module.exports = mongoose.model('Meal', mealSchema)


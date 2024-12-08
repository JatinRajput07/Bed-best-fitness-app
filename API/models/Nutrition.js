
const mongoose = require('mongoose')

const nutritionSchema = mongoose.Schema({
    title: String,
    description: String,
    active: { type: Boolean, default: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Nutrition', nutritionSchema)


const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type:String,
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
}, {
    timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);

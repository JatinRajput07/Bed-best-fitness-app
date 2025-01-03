const mongoose = require("mongoose");

const highlightSchema = mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, "A highlight must have a URL"],
        },
    },
    {
        timestemps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Highlight = mongoose.model("Highlight", highlightSchema);

module.exports = Highlight;

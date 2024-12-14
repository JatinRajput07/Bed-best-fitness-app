const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    host_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    video_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recommended_at: {
        type: Date,
        default: Date.now,
    },
});

recommendationSchema.index({ video_id: 1, user_id: 1 }, { unique: true })

module.exports = mongoose.model("Recommendation", recommendationSchema);

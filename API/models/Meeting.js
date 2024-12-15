const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    googleMeetLink: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    roles: {
        type: [String],
        required: true,
    },
    meetingDate: {
        type: Date, 
        required: true,
    },
    meetingTime: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;

const { default: mongoose } = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    lastMessage: {
        type: String
    },
}, { timestamps: true });


const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;

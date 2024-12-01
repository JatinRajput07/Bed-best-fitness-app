const Conversation = require("./models/Conversation");
const Message = require("./models/Message");


exports.sendMessage = async (senderId, receiverId, messageContent, messageType = 'text', attachments = []) => {
    try {
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                updatedAt: new Date(),
            });
        } else {
            conversation.updatedAt = new Date();
            await conversation.save();
        }

        const newMessage = await Message.create({
            conversationId: conversation._id,
            sender: senderId,
            receiver: receiverId,
            message: messageContent,
            messageType,
            attachments,
        });

        conversation.lastMessage = newMessage._id;
        await conversation.save();

        return newMessage;
    } catch (error) {
        console.error('Error handling send_message:', error);
        throw error;
    }
};



exports.getMessages = async (conversationId, page = 1, limit = 20) => {
    const messages = await Message.find({ conversationId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return messages.reverse();
},


    exports.markAsRead = async (conversationId, userId) => {
        await Message.updateMany(
            { conversationId, receiver: userId, status: { $ne: 'read' } },
            { status: 'read' }
        );
    }


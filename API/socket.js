
const { Types } = require("mongoose");
const User = require("./models/User");
const Message = require('./models/Message')
const Conversation = require('./models/Conversation')

module.exports = (io) => {
    io.on("connection", (socket) => {

        socket.on("connectUser", async (data) => {
            console.log(`User connected: ${data.userId}`);

            const user = await User.findById(data.userId);
            if (user) {
                user.socketId = socket.id;
                user.isOnline = true;
                await user.save();
            } else {
                console.log(`User ${data.userId} not found.`);
            }
            socket.emit("connectListener", { socketId: socket.id });
        });

        socket.on("sendMessage", async ({ senderId, receiverId, message, messageType, attachments }) => {
            const sender = await User.findById(senderId);
            const receiver = await User.findById(receiverId);

            if (!sender || !receiver) {
                console.log("Sender or Receiver not found.");
                return;
            }

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                conversation = new Conversation({
                    participants: [senderId, receiverId],
                    lastMessage: newMessage._id,
                    // unreadCount: { [receiverId]: 1 },
                });
            }

            const newMessage = new Message({
                conversationId: conversation?._id,
                sender: senderId,
                receiver: receiverId,
                message,
                messageType,
                attachments,
            });

            await newMessage.save();

            // } else {
            //     conversation.lastMessage = newMessage._id;
            //     conversation.unreadCount.set(receiverId, (conversation.unreadCount.get(receiverId) || 0) + 1);
            // }

            await conversation.save();

            if (receiver.socketId) {
                io.to(receiver.socketId).emit("receiveMessage", {
                    ...newMessage.toObject(),
                    sender: { name: sender.name },
                });
            } else {
                console.log(`User ${receiverId} is offline.`);
            }

            socket.emit("messageSent", {
                success: true,
                message: newMessage.toObject(),
            });
        });


        socket.on("chatList", async ({ conversationId, skip = 0, limit = 20 }) => {
            if (conversationId) {
                const messages = await Message.find({
                    conversationId: new Types.ObjectId(conversationId),
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .populate("sender", "name email")
                    .populate("receiver", "name email");

                socket.emit("myChatList", messages);
            }
        });

        socket.on("userList", async ({ userId }) => {
            const conversations = await Conversation.find({
                participants: userId,
            })
                .sort({ updatedAt: -1 })
                .populate("participants", "name email isOnline");

            const userChats = await Promise.all(
                conversations.map(async (conversation) => {
                    const unreadCount = conversation.unreadCount.get(userId) || 0;
                    return { ...conversation.toObject(), unreadCount };
                })
            );

            socket.emit("myChatUserList", userChats);
        });

        socket.on("user_disconnect", async ({ userId }) => {
            if (userId) {
                const user = await User.findById(userId);
                if (user) {
                    user.socketId = null;
                    user.isOnline = false;
                    await user.save();
                }
            }
            socket.emit("user_disconnect", {});
        });
    });

    return io
};

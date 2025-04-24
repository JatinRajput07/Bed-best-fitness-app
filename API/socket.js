const { Types } = require("mongoose");
const User = require("./models/User");
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const { sendPushNotification } = require("./utils/firebaseService");

module.exports = (io) => {
    io.on("connection", (socket) => {
        // Handle user connection
        socket.on("connectUser", async (data) => {
            console.log(`User connected: ${data.userId}`);
            try {
                const user = await User.findById(data.userId);
                if (user) {
                    user.socketId = socket.id;
                    user.isOnline = true;
                    await user.save();

                    io.emit("onlineStatus", { userId: data.userId, isOnline: true });
                } else {
                    console.log(`User ${data.userId} not found.`);
                }
                socket.emit("connectListener", { socketId: socket.id });
            } catch (error) {
                console.error("Error in connectUser:", error);
            }
        });

        // Handle user disconnection
        socket.on("user_disconnect", async ({ userId }) => {
            if (userId) {
                try {
                    const user = await User.findById(userId);
                    if (user) {
                        user.socketId = null;
                        user.isOnline = false;
                        await user.save();

                        // Notify all users about the offline status
                        io.emit("onlineStatus", { userId, isOnline: false });
                    }
                } catch (error) {
                    console.error("Error in user_disconnect:", error);
                }
            }
            socket.emit("user_disconnect", {});
        });

        socket.on("sendMessage", async ({ senderId, receiverId, message, messageType, attachments }) => {
            try {
                const sender = await User.findById(senderId);
                const receiver = await User.findById(receiverId);

                if (!sender || !receiver) {
                    console.log("Sender or Receiver not found.");
                    return;
                }

                // Find or create a conversation
                let conversation = await Conversation.findOne({
                    participants: { $all: [senderId, receiverId] },
                });

                if (!conversation) {
                    conversation = await Conversation.create({
                        participants: [senderId, receiverId],
                        lastMessage: message,
                    });
                }

                // Create a new message
                const newMessage = new Message({
                    conversationId: conversation._id,
                    sender: senderId,
                    receiver: receiverId,
                    message,
                    messageType,
                    attachments,
                });

                await newMessage.save();

                if (receiver && receiver?.device_token) {
                    console.log("receiver?.device_token", receiver?.device_token);
                    await sendPushNotification(
                        receiver?.device_token,
                        `New message from ${sender?.name || sender?.email}`,
                        receiverId,
                        "userApp",
                        "chat"
                    );
                }

                // Update conversation's last message
                conversation.lastMessage = newMessage._id;
                await conversation.save();

                // Emit the message to the receiver if online
                if (receiver.socketId) {
                    io.to(receiver.socketId).emit("receiveMessage", {
                        ...newMessage.toObject(),
                        sender: { name: sender.name },
                    });
                } else {
                    console.log(`User ${receiverId} is offline.`);
                }

                // Notify the sender that the message was sent successfully
                socket.emit("messageSent", {
                    success: true,
                    message: newMessage.toObject(),
                });
            } catch (error) {
                console.error("Error in sendMessage:", error);
            }
        });


        socket.on("chatList", async ({ senderId, receiverId, skip = 0, limit = 20 }) => {
            if (senderId && receiverId) {
                try {
                    const conversation = await Conversation.findOne({
                        participants: { $all: [senderId, receiverId] },
                    });



                    if (conversation) {
                        const messages = await Message.find({
                            conversationId: conversation._id,
                        })
                            // .sort({ createdAt: -1 })
                            // .skip(skip)
                            // .limit(limit)
                            .populate("sender", "name email profilePicture")
                            .populate("receiver", "name email profilePicture");

                        console.log(messages, '=======senderId, receiverId=====')

                        socket.emit("myChatList", messages);
                    } else {
                        socket.emit("myChatList", []);
                    }
                } catch (error) {
                    console.error("Error in chatList:", error);
                }
            }
        });

        socket.on("userList", async ({ userId }) => {
            try {
                const conversations = await Conversation.find({
                    participants: { $in: [userId] },
                })
                    .sort({ updatedAt: -1 })
                    .populate("participants", "name email isOnline profilePicture");

                const userChats = await Promise.all(
                    conversations.map(async (conversation) => {
                        const otherUser = conversation.participants.find(
                            (participant) => participant._id.toString() !== userId
                        );
                        const unreadCount = conversation.unreadCount?.get(userId) || 0;

                        const isDeleted = !otherUser;

                        return {
                            conversationId: conversation._id,
                            otherUser: isDeleted
                                ? { deleted: true }
                                : {
                                    _id: otherUser?._id,
                                    name: otherUser?.name,
                                    email: otherUser?.email,
                                    profilePicture: otherUser?.profilePicture,
                                    isOnline: otherUser?.isOnline,
                                    deleted: false,
                                },
                            lastMessage: conversation.lastMessage,
                            unreadCount: conversation.unreadCount?.get?.(userId) || 0,
                        };
                    })
                );

                console.log(userChats, '===d==d==f=f=f=')

                socket.emit("myChatUserList", userChats);
            } catch (error) {
                console.error("Error in userList:", error);
            }
        });
    });

    return io;
};
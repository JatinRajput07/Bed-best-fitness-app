const { Server } = require('socket.io');
const User = require('./models/User');
const { sendMessage } = require('./Socket_functions');
const Message = require('./models/Message');
// const reminderScheduler = require('./reminderScheduler');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on("connect_user", async function (data, ack) {
            try {
                const { userId } = data;
                const user = await User.findById(userId);
                if (!user) {
                    console.error('User not found');
                    if (typeof ack === "function") {
                        ack({ success: false, message: 'User not found' });
                    }
                    return;
                }
                user.socketId = socket.id;
                user.isOnline = true;
                await user.save();
                console.log(`User ${user.username} is now online`);
                if (typeof ack === "function") {
                    ack({
                        success: true,
                        message: 'User connected successfully',
                        userId: user._id,
                        socketId: user.socketId,
                        isOnline: user.isOnline,
                    });
                }
            } catch (err) {
                console.error('Error connecting user:', err);
                if (typeof ack === "function") {
                    ack({ success: false, message: 'Failed to connect user' });
                }
            }
        });

        socket.on('disconnect', async () => {
            console.log('A user disconnected:', socket.id);
            try {
                const user = await User.findOne({ socketId: socket.id });
                if (user) {
                    user.isOnline = false;
                    await user.save();
                    console.log(`User ${user.username} is now offline`);
                }
            } catch (err) {
                console.error('Error during disconnect:', err);
            }
        });

        socket.on('send_message', async (data, ack) => {
            try {
                const { senderId, receiverId, message, messageType = 'text', attachments = [] } = data;

                if (!senderId || !receiverId || !message) {
                    return ack({ status: 'error', message: 'Invalid data provided' });
                }

                const newMessage = await sendMessage(senderId, receiverId, message, messageType, attachments);

                const receiverSocketId = await User.findOne({ _id: receiverId }).then(user => user?.socketId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('receive_message', newMessage);
                } else {
                    console.log(`Receiver ${receiverId} is offline, message saved in DB.`);
                }

                ack({ status: 'success', data: newMessage });

            } catch (error) {
                console.error('Error handling send_message:', error);
                ack({ status: 'error', message: 'Failed to send message' });
            }
        });

        socket.on('get_all_messages', async (data, ack) => {
            try {
                const { conversationId } = data;

                if (!conversationId) {
                    return ack({ status: 'error', message: 'Invalid conversation ID provided' });
                }

                // Fetch messages
                const messages = await Message.find({ conversationId })
                    .sort({ createdAt: 1 })
                    .populate('sender', 'name')
                    .populate('receiver', 'name');

                // Return messages to client
                if (typeof ack === 'function') {
                    ack({ status: 'success', data: messages });
                }

                socket.emit('get_all_messages', { conversationId: 'CONVERSATION_ID_HERE' }, (response) => {
                    if (response.status === 'success') {
                        console.log('Messages:', response.data);
                    } else {
                        console.error('Error fetching messages:', response.message);
                    }
                });

            } catch (error) {
                console.error('Error fetching messages:', error);
                if (typeof ack === 'function') {
                    ack({ status: 'error', message: 'Failed to fetch messages' });
                }
            }
        });

        // reminderScheduler(io);

    });



    return io;
};

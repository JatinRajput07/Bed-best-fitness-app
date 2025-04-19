import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, Typography, Button, Input, Avatar } from "@material-tailwind/react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://43.204.2.84:7200");

const ChatComponent = () => {
    const { id } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.emit("connectUser", { userId: id });
        socket.on("onlineStatus", (user) => {
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.otherUser._id === user.userId
                        ? { ...u, otherUser: { ...u.otherUser, isOnline: user.isOnline } }
                        : u
                )
            );
        });

        socket.on("receiveMessage", (message) => {
            if (
                selectedUser &&
                (message.sender === selectedUser.otherUser._id ||
                    message.receiver === selectedUser.otherUser._id)
            ) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        socket.on("myChatUserList", (userList) => {
            setUsers(userList);
        });

        socket.on("myChatList", (chats) => {
            setMessages(chats);
        });

        socket.emit("userList", { userId: id });

        return () => {
            socket.off("onlineStatus");
            socket.off("receiveMessage");
            socket.off("myChatUserList");
            socket.off("myChatList");
        };
    }, [id]);

    useEffect(() => {
        if (selectedUser) {
            socket.emit("chatList", {
                senderId: id,
                receiverId: selectedUser.otherUser._id,
            });
        }
    }, [selectedUser, id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedUser) {
            const message = {
                senderId: id,
                receiverId: selectedUser.otherUser._id,
                message: newMessage,
                messageType: "text",
            };
            socket.emit("sendMessage", message);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    ...message,
                    sender: { _id: id },
                    receiver: { _id: selectedUser.otherUser._id },
                    createdAt: new Date().toISOString(),
                },
            ]);

            setNewMessage("");
        }
    };

    return (
        <div className="mt-12 mb-8 flex flex-col items-center">
            <Card className="w-full max-w-6xl shadow-lg mb-6">
                <CardHeader
                    variant="gradient"
                    className="bg-gradient-to-r from-blue-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center"
                >
                    <Typography variant="h5" color="white">
                        Chat
                    </Typography>
                </CardHeader>
                <div className="flex flex-col md:flex-row">
                    {/* Left Side: User List */}
                    <div className="w-full md:w-1/4 border-r p-4 max-h-[500px] overflow-y-auto">
                        <Typography variant="h6" className="mb-4">
                            Users
                        </Typography>
                        {users.length === 0 ? (
                            <Typography variant="small" className="text-gray-500">
                                No users available.
                            </Typography>
                        ) : (
                            users.map((user) => {
                                const { deleted } = user.otherUser || {};
                                const isSelected =
                                    selectedUser?.otherUser._id === user.otherUser._id;

                                return (
                                    <div
                                        key={user.otherUser._id}
                                        className={`flex items-center p-2 mb-2 rounded-lg ${isSelected
                                                ? "bg-blue-100"
                                                : "hover:bg-gray-100"
                                            } ${deleted
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                                        onClick={() => {
                                            if (!deleted) setSelectedUser(user);
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                user?.otherUser?.avatar ||
                                                user?.otherUser?.profilePicture ||
                                                "/img/profile.png"
                                            }
                                            alt={user.otherUser.name}
                                            className="mr-2"
                                        />
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="font-semibold"
                                            >
                                                {user?.otherUser?.name || "Deleted User"}
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                className={`text-xs ${deleted
                                                        ? "text-red-500"
                                                        : user?.otherUser?.isOnline
                                                            ? "text-green-500"
                                                            : "text-gray-500"
                                                    }`}
                                            >
                                                {deleted
                                                    ? "Deleted"
                                                    : user?.otherUser?.isOnline
                                                        ? "Online"
                                                        : "Offline"}
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Right Side: Chat Box */}
                    <div className="w-full md:w-3/4 p-4">
                        {selectedUser ? (
                            <div className="flex flex-col h-[500px] border rounded-md overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center border-b p-4 bg-gray-50">
                                    <Avatar
                                        src={
                                            selectedUser.otherUser.avatar ||
                                            selectedUser.otherUser.profilePicture ||
                                            "/img/profile.png"
                                        }
                                        alt={selectedUser.otherUser.name}
                                        className="mr-2"
                                    />
                                    <Typography variant="h6">
                                        {selectedUser.otherUser.name}
                                    </Typography>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.sender._id === id ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-xs p-4 rounded-lg relative shadow-md flex flex-col ${message.sender._id === id
                                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                        : "bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                <Typography>{message.message}</Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs mt-1 text-right"
                                                >
                                                    {new Date(message.createdAt).toLocaleTimeString()}
                                                </Typography>
                                                <div
                                                    className={`absolute w-3 h-3 transform rotate-45 ${message.sender._id === id
                                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 -right-1.5 top-3"
                                                            : "bg-gray-200 -left-1.5 top-3"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Box */}
                                <div className="p-4 border-t bg-gray-50 flex gap-2">
                                    <Input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1"
                                        onKeyPress={(e) =>
                                            e.key === "Enter" && handleSendMessage()
                                        }
                                    />
                                    <Button color="blue" onClick={handleSendMessage}>
                                        Send
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Typography variant="h6" className="text-gray-700 text-center">
                                Select a user to start chatting.
                            </Typography>
                        )}
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default ChatComponent;

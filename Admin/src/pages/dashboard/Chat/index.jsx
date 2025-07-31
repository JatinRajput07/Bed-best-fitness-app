import React, { useState, useEffect, useRef } from "react";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    Input,
    Avatar,
    Alert
} from "@material-tailwind/react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const ChatComponent = () => {
    const { id } = useSelector((state) => state.auth);
    const socketRef = useRef(null); // useRef for socket
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Initialize socket connection
    useEffect(() => {
        const socket = io("http://43.204.2.84:7200", {
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000,
            autoConnect: true,
            transports: ["websocket"]
        });

        socketRef.current = socket;

        const onConnect = () => {
            setConnectionStatus("connected");
            setError(null);
            console.log("Socket connected");
        };

        const onDisconnect = () => {
            setConnectionStatus("disconnected");
            setError("Connection lost. Attempting to reconnect...");
        };

        const onConnectError = (err) => {
            setConnectionStatus("error");
            setError(`Connection error: ${err.message}`);
        };

        const onReconnectAttempt = (attempt) => {
            setConnectionStatus("reconnecting");
            setError(`Attempting to reconnect (${attempt}/5)...`);
        };

        const onReconnectFailed = () => {
            setConnectionStatus("failed");
            setError("Failed to reconnect. Please refresh the page.");
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("connect_error", onConnectError);
        socket.on("reconnect_attempt", onReconnectAttempt);
        socket.on("reconnect_failed", onReconnectFailed);

        return () => {
            socket.disconnect();
        };
    }, []);

    // Register current user and set up event listeners
    useEffect(() => {
        const socket = socketRef.current;
        if (!id || connectionStatus !== "connected" || !socket) return;

        socket.emit("connectUser", { userId: id }, (ack) => {
            if (ack?.error) {
                setError(`Connection error: ${ack.error}`);
                return;
            }
            console.log("User connected successfully");
        });

        const handleOnlineStatus = (user) => {
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.otherUser._id === user.userId
                        ? { ...u, otherUser: { ...u.otherUser, isOnline: user.isOnline } }
                        : u
                )
            );
        };

        const handleReceiveMessage = (message) => {
            if (!message) return;
            if (selectedUser &&
                (message.sender?._id === selectedUser.otherUser._id || message.sender?._id === id)) {
                setMessages(prev => [...prev, message]);
            }
        };

        const handleUserList = (userList) => {
            if (!Array.isArray(userList)) {
                setError("Failed to load user list");
                return;
            }
            setUsers(userList);
            if (userList.length > 0 && !selectedUser) {
                setSelectedUser(userList[0]);
            }
        };

        socket.on("onlineStatus", handleOnlineStatus);
        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("myChatUserList", handleUserList);

        socket.emit("userList", { userId: id }, (response) => {
            if (response?.error) {
                setError(`Failed to get user list: ${response.error}`);
            }
        });

        return () => {
            socket.off("onlineStatus", handleOnlineStatus);
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("myChatUserList", handleUserList);
        };
    }, [id, connectionStatus, selectedUser]);

    // Load messages for selected user
    useEffect(() => {
        const socket = socketRef.current;
        if (!selectedUser || !socket || connectionStatus !== "connected") return;

        const loadMessages = () => {
            setLoading(true);

            console.log(selectedUser.otherUser._id, '=-==s==d=d')
            socket.emit("chatList", {
                senderId: id,
                receiverId: selectedUser.otherUser._id
            }, (response) => {
                if (response?.error) {
                    setError(`Failed to load messages: ${response.error}`);
                    setMessages([]);
                    return;
                }
            });

            const chatListListener = (chats) => {
                console.log(chats, '====chats')
                if (!Array.isArray(chats?.messages)) {
                    setError("Failed to load messages");
                    return;
                }

                setMessages(chats?.messages || []);
                setLoading(false);
            };

            socket.on("myChatList", chatListListener);

            return () => {
                socket.off("myChatList", chatListListener);
            };
        };

        loadMessages();
    }, [selectedUser, id, connectionStatus]);

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        const socket = socketRef.current;
        if (!newMessage.trim() || !selectedUser || connectionStatus !== "connected" || !socket) return;

        const message = {
            senderId: id,
            receiverId: selectedUser.otherUser._id,
            message: newMessage.trim(),
            messageType: "text"
        };

        const tempId = Date.now();
        setMessages(prev => [
            ...prev,
            {
                ...message,
                _id: tempId,
                sender: { _id: id },
                receiver: { _id: selectedUser.otherUser._id },
                createdAt: new Date().toISOString()
            }
        ]);

        socket.emit("sendMessage", message, (ack) => {
            if (ack?.error) {
                setError(`Failed to send message: ${ack.error}`);
                setMessages(prev => prev.filter(m => m._id !== tempId));
            } else {
                setMessages(prev =>
                    prev.map(m =>
                        m._id === tempId ? { ...m, _id: ack._id } : m
                    )
                );
            }
        });

        setNewMessage("");
    };

    const connectionStatusColors = {
        connected: "green",
        connecting: "blue",
        reconnecting: "orange",
        disconnected: "red",
        error: "red",
        failed: "red"
    };

    return (
        <div className="mt-12 mb-8 flex flex-col items-center">
            <Card className="w-full max-w-6xl shadow-lg mb-6">
                <CardHeader
                    variant="gradient"
                    className="bg-gradient-to-r from-blue-800 to-indigo-600 p-6 rounded-t-lg flex justify-between items-center"
                >
                    <Typography variant="h5" color="white">Chat</Typography>
                    <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 bg-${connectionStatusColors[connectionStatus]}-500`} />
                        <Typography variant="small" color="white">{connectionStatus}</Typography>
                    </div>
                </CardHeader>

                {error && (
                    <Alert color="red" className="rounded-none">
                        {error}
                        {connectionStatus === "failed" && (
                            <Button color="white" size="sm" className="ml-4" onClick={() => window.location.reload()}>
                                Refresh
                            </Button>
                        )}
                    </Alert>
                )}

                <div className="flex flex-col md:flex-row">
                    {/* Left: User List */}
                    <div className="w-full md:w-1/4 border-r p-4 max-h-[500px] overflow-y-auto">
                        <Typography variant="h6" className="mb-4">Users</Typography>
                        {users.length === 0 ? (
                            <Typography variant="small" className="text-gray-500">
                                {loading ? "Loading users..." : "No users available."}
                            </Typography>
                        ) : (
                            users.map(user => {
                                const { deleted } = user.otherUser || {};
                                const isSelected = selectedUser?.otherUser._id === user.otherUser._id;
                                return (
                                    <div
                                        key={user.otherUser._id}
                                        className={`flex items-center p-2 mb-2 rounded-lg ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"} ${deleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                        onClick={() => {
                                            if (!deleted && connectionStatus === "connected") {
                                                setSelectedUser(user);
                                            }
                                        }}
                                    >
                                        <Avatar
                                            src={user?.otherUser?.avatar || user?.otherUser?.profilePicture || "/img/profile.png"}
                                            alt={user.otherUser.name}
                                            className="mr-2"
                                        />
                                        <div>
                                            <Typography variant="small" className="font-semibold">
                                                {user?.otherUser?.name || "Deleted User"}
                                            </Typography>
                                            <Typography variant="small" className={`text-xs ${deleted ? "text-red-500" : user?.otherUser?.isOnline ? "text-green-500" : "text-gray-500"}`}>
                                                {deleted ? "Deleted" : user?.otherUser?.isOnline ? "Online" : "Offline"}
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Right: Chat */}
                    <div className="w-full md:w-3/4 p-4">
                        {selectedUser ? (
                            <div className="flex flex-col h-[500px] border rounded-md overflow-hidden">
                                <div className="flex items-center border-b p-4 bg-gray-50">
                                    <Avatar
                                        src={selectedUser.otherUser.avatar || selectedUser.otherUser.profilePicture || "/img/profile.png"}
                                        alt={selectedUser.otherUser.name}
                                        className="mr-2"
                                    />
                                    <Typography variant="h6">{selectedUser.otherUser.name}</Typography>
                                    <Typography variant="small" className="ml-2">
                                        {selectedUser.otherUser.isOnline ? "🟢 Online" : "⚫ Offline"}
                                    </Typography>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                                    {loading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <Typography>Loading messages...</Typography>
                                        </div>
                                    ) : messages.length > 0 ? (

                                        messages.slice()
                                            .reverse().map((message, index) => {
                                                const isSender = message.sender?._id === id || message.senderId === id;
                                                return (
                                                    <div key={message._id || index} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                                                        <div className={`max-w-xs p-4 rounded-lg relative shadow-md flex flex-col ${isSender ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                                                            <Typography>{message.message || message.text}</Typography>
                                                            <Typography variant="small" className="text-xs mt-1 text-right">
                                                                {new Date(message.createdAt || message.timestamp).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit"
                                                                })}
                                                            </Typography>
                                                            <div className={`absolute w-3 h-3 transform rotate-45 ${isSender ? "bg-gradient-to-r from-blue-500 to-blue-600 -right-1.5 top-3" : "bg-gray-200 -left-1.5 top-3"}`} />
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    ) : (
                                        <div className="flex justify-center items-center h-full">
                                            <Typography>
                                                {connectionStatus === "connected"
                                                    ? "No messages yet. Start the conversation!"
                                                    : "Cannot load messages - connection issue"}
                                            </Typography>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="p-4 border-t bg-gray-50 flex gap-2">
                                    {/* <Input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder={connectionStatus === "connected" ? "Type a message..." : "Cannot send - connection issue"}
                                        className="flex-1"
                                        disabled={connectionStatus !== "connected"}
                                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    />
                                    <Button
                                        color="blue"
                                        onClick={handleSendMessage}
                                        disabled={connectionStatus !== "connected" || !newMessage.trim()}
                                    >
                                        Send
                                    </Button> */}
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-[500px]">
                                <Typography variant="h6" className="text-gray-700">
                                    {connectionStatus === "connected"
                                        ? "Select a user to start chatting."
                                        : "Waiting for connection..."}
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ChatComponent;

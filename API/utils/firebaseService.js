const { userApp, partnerApp } = require('../config/firebase-admin-config');
const Notification = require('../models/Notification');

// Firebase push notification service
exports.sendPushNotification = async (deviceToken, message, userId, app) => {
  try {
    const payload = {
      notification: {
        title: "Reminder",
        body: message,
      },
    };

    const response = await userApp.messaging().sendToDevice(deviceToken, payload);
    await Notification.create({
      userId,
      message,
      type: payload?.notification?.title,
      status: success ? "sent" : "failed",
    });
    console.log("Push notification sent:", response);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};




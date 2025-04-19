const { userApp, partnerApp } = require('../config/firebase-admin-config');
const Notification = require('../models/Notification');

// Firebase push notification service
exports.sendPushNotification = async (deviceToken, msg, userId, app ,type = "") => {

  console.log(deviceToken, msg, userId, app, '=========msg============')
  try {
    const message = {
      notification: {
        title: `${type === 2  ? "New Message" : "Reminder"}`,
        body: msg
      },
      data: {
        type: `${type === 2  ? "New Message" : "Reminder"}`
      },
      token: deviceToken,
    };

    await Notification.create({
      userId,
      message: msg,
      type: `${type === 2  ? "New Message" : "Reminder"}`,
      status: "sent"
    });

    // response = await userApp.messaging().send(message);
    const response = await userApp.messaging().send(message);

    console.log("Push notification sent:", response);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};




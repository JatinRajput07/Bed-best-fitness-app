const { userApp, partnerApp } = require('../config/firebase-admin-config');
const Notification = require('../models/Notification');

// Firebase push notification service
exports.sendPushNotification = async (deviceToken, msg, userId, app, type = "",notificationData) => {

  console.log(deviceToken, msg, userId, app, type, '=========msg============')
  try {
    const message = {
      notification: {
        title: `${type === "chat" ? "New Message" : type === "assign" ? "assign" : "Reminder"}`,
        body: msg,
        // type: type
      },
      data: {
        type: type,
        messageType: `${type === "chat" ? "New Message" : "Reminder"}`
      },
      token: deviceToken,
    };

    if (notificationData) {
      message.data.notificationData = JSON.stringify(notificationData); // Convert notificationData to a string
    }

    // await Notification.create({
    //   userId,
    //   message: msg,
    //   type: `${type === 2  ? "New Message" : "Reminder"}`,
    //   status: "sent"
    // });

    // response = await userApp.messaging().send(message);
    const firebaseApp = app === "partnerApp" ? partnerApp : userApp;

    const response = await firebaseApp.messaging().send(message);

    console.log("Push notification sent:", response);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};




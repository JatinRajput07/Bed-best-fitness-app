const { userApp, partnerApp } = require('../config/firebase-admin-config');

// Firebase push notification service
exports.sendPushNotification = async (deviceToken, message, app) => {
    try {
      const payload = {
        notification: {
          title: "Reminder",
          body: message,
        },
      };
  
      const response = await userApp.messaging().sendToDevice(deviceToken, payload);
      console.log("Push notification sent:", response);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };
  



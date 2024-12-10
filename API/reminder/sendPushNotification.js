
const { userApp } = require('../config/firebase-admin-config')

exports.sendPushNotification = async (deviceToken, message) => {
    try {
        const payload = {
            notification: {
                title: "Reminder",
                body: message,
            },
            data: {
                type: 1,
            },
            token: deviceToken,
        };

        // Send notification to the user's Firebase token
        let response = await userApp.messaging().send(payload);
        console.log("Notification sent successfully.", response);
    } catch (error) {
        console.error("Error sending notification: ", error);
    }
};
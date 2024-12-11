
const AdminApp  = require('../config/firebase-admin-config')

const sendPushNotification = async (deviceToken, payload) => {
    try {
        const payload = {
            notification: {
                title: "Reminder",
                body: "hiiiiii",
            },
            data: {
                type: "1",
            },
            token: deviceToken,
        };

        // Send notification to the user's Firebase token
        let response = await AdminApp.userApp.messaging().send(payload);
        console.log("Notification sent successfully.", response);
    } catch (error) {
        console.error("Error sending notification: ", error);
    }
};


exports.testNotification = async (req, res) => {
    console.log('wertyuiopojhbvbk,m ')
    try {
        const payload = {
            type: 2,
            notificationType: 1,
            title: "sasdfsdfd", 
            body: "send",
            referenceId: 20,
            // senderId: userId,
            // receiverId: "66bd9eea9ddd23c16796aab5",
        };

        await sendPushNotification("dAGKhilFnk_Gs5qbfVhUJY:APA91bFcjb8KQHRakYm_PaY1aoZbU12OUSTyj9diFsdGZICO3pU9uxOUQ30O5f9sdzqschukwyQ3iYnhTYEIel78LiXtEOMKdakYk2zy5Y2t3KvjmXCwpYU", payload);
        return  res.json("Notification successfully sent.")
    } catch (error) {
        console.log(error,'=======testNotification=======')
        // return helper.error(res, error.message || error);
    }
};
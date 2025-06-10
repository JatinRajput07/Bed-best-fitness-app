const cron = require('node-cron');
const User = require('./models/User');
const Meeting = require('./models/Meeting');
const { sendPushNotification } = require('./utils/firebaseService');

const scheduleNotifications = async () => {
  try {
    const now = new Date();
    // Fetch upcoming meetings
    const meetings = await Meeting.find({
      $or: [
        { meetingDate: { $gt: now } },
        {
          meetingDate: { $gte: new Date(now.toISOString().split('T')[0]) },
          meetingTime: { $gt: now.toTimeString().split(' ')[0].slice(0, 5) },
        },
      ],
    });

    for (const meeting of meetings) {
      const [year, month, day] = meeting.meetingDate.toISOString().split('T')[0].split('-').map(Number);
      const [hour, minute] = meeting.meetingTime.split(':').map(Number);
      const meetingDateTime = new Date(year, month - 1, day, hour, minute);
      
      // Calculate 30-minute and 15-minute notification times
      const thirtyMinBefore = new Date(meetingDateTime.getTime() - 30 * 60 * 1000);
      const fifteenMinBefore = new Date(meetingDateTime.getTime() - 15 * 60 * 1000);
      
      // Check if current time is within 1 minute of the notification times
      const timeDiffThirty = (thirtyMinBefore - now) / (1000 * 60); // Minutes until 30-min reminder
      const timeDiffFifteen = (fifteenMinBefore - now) / (1000 * 60); // Minutes until 15-min reminder

      let usersToNotify = [];
      if (meeting.roles.includes("user")) {
        const users = await User.find({ role: "user" });
        usersToNotify = [...usersToNotify, ...users];
      }
      if (meeting.roles.includes("coach")) {
        const coaches = await User.find({ role: "coach" });
        usersToNotify = [...usersToNotify, ...coaches];
      }

      const reminderMessage = `You have a meeting scheduled on ${meeting.meetingDate.toISOString().split('T')[0]} at ${meeting.meetingTime}.`;

      for (const user of usersToNotify) {
        const app = meeting.roles.includes("coach") && user.role === "coach" ? "partnerApp" : "userApp";

        // Send notification if within 1 minute of 30-minute reminder
        if (timeDiffThirty >= 0 && timeDiffThirty < 1) {
          await sendPushNotification(
            user.device_token,
            reminderMessage,
            user._id,
            app,
            "Reminder",
            { meetingId: meeting._id, link: meeting.googleMeetLink }
          );
        }

        // Send notification if within 1 minute of 15-minute reminder
        if (timeDiffFifteen >= 0 && timeDiffFifteen < 1) {
          await sendPushNotification(
            user.device_token,
            reminderMessage,
            user._id,
            app,
            "Reminder",
            { meetingId: meeting._id, link: meeting.googleMeetLink }
          );
        }
      }
    }
    console.log('Checked for meeting notifications at', now.toISOString());
  } catch (error) {
    console.error('Error checking notifications:', error);
  }
};

// Run on server startup
scheduleNotifications();

// Run every minute to check for notifications
cron.schedule('* * * * *', scheduleNotifications);

module.exports = scheduleNotifications;
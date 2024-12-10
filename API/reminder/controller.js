const cron = require("node-cron");
const moment = require("moment");

const sendPushNotification = require("./sendPushNotification"); 
const Reminder = require("../models/Reminder");
const User = require("../models/User");

const isCustomReminderDay = (reminderDays) => {
  const today = moment().format('dddd').toLowerCase();
  return reminderDays.includes(today);
};

const checkReminders = async () => {
  const currentTime = moment().format("HH:mm"); 

  const reminders = await Reminder.find({
    time: currentTime,
    isActive: true,
  });

  for (const reminder of reminders) {
    let isReminderDay = false;
    if (reminder.repeatType === "daily") {
      isReminderDay = true;
    } else if (reminder.repeatType === "custom") {
      isReminderDay = isCustomReminderDay(reminder[reminder.category]?.map(e => e.day));
    }

    if (isReminderDay) {
      const user = await User.findById(reminder.userId);
      if (user && user.device_token) {
        let message;
        switch (reminder.category) {
          case "meal":
            message = `It's time for your meal: ${reminder.meal.breakfast || "Breakfast"}`;
            break;
          case "water":
            message = "Time to drink water!";
            break;
          case "steps":
            message = "Time to walk! Stay active!";
            break;
          case "workout":
            message = "Time for your workout session!";
            break;
          default:
            message = "Reminder!";
        }

        // Send the push notification
        await sendPushNotification(user.device_token, message  );
      }
    }
  }
};


cron.schedule("*/1 * * * *", checkReminders); // Check reminders every minute

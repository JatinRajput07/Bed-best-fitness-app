const cron = require("node-cron");
const { sendPushNotification } = require("./utils/firebaseService");
const Reminder = require("./models/Reminder");
const User = require("./models/User");
const MealReminder = require("./models/MealReminder");
const WaterReminder = require("./models/WaterReminder");

cron.schedule("* * * * *", async () => {
    console.log("Checking reminders...");
    try {
        // Fetch all users
        const users = await User.find({});

        // Loop through each user to check and send reminders
        for (let user of users) {
            // Fetch all reminders for the current user
            const mealReminders = await MealReminder.find({ userId: user._id });
            const waterReminders = await WaterReminder.find({ userId: user._id });
            const otherReminders = await Reminder.find({ userId: user._id });

            // Combine all reminders for this user
            const reminders = [
                ...mealReminders.map(reminder => ({ ...reminder.toObject(), type: "meal" })),
                ...waterReminders.map(reminder => ({ ...reminder.toObject(), type: "water" })),
                ...otherReminders.map(reminder => ({ ...reminder.toObject(), type: "other" }))
            ];

            // Handle each reminder type accordingly
            for (let reminder of reminders) {
                const { reminderType, meals, reminderTime, weeklyTimes, reminderOn, userId, type, customTimes, intervalMinutes, startTime, endTime } = reminder;

                if (reminderOn) {
                    if (type === "meal" && meals) {
                        await checkMealReminders(user, meals);
                    } else if (type === "water") {
                        await checkWaterReminders(user, reminder);
                    } else if (type === "other") {
                        if (reminderType === "once") {
                            await checkOnceReminder(user, reminderTime);
                        } else if (reminderType === "interval") {
                            await checkIntervalReminder(user, reminder, intervalMinutes, startTime, endTime);
                        } else if (reminderType === "custom") {
                            await checkCustomReminder(user, reminder, weeklyTimes);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error checking reminders: ", error);
    }
});

// Check meal reminders
const checkMealReminders = async (user, meals) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    for (let mealType in meals) {
        const meal = meals[mealType];
        if (meal.enabled && meal.time === currentTime && user.device_token) {
            await sendPushNotification(user.device_token, `Time for ${mealType}`, "userApp");
        }
    }
};

// Check water reminders
const checkWaterReminders = async (user, reminder) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    if (reminder.reminderTime === currentTime && user.device_token) {
        await sendPushNotification(user.device_token, "Time to drink water!", "userApp");
    }
};

// Check 'once' type reminder (one-time reminder)
const checkOnceReminder = async (user, reminderTime) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    if (reminderTime === currentTime && user.device_token) {
        await sendPushNotification(user.device_token, "Reminder for one-time task!", "userApp");
    }
};

// Check 'interval' type reminder (repeating reminders)
const checkIntervalReminder = async (user, reminder, intervalMinutes, startTime, endTime) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const currentMinute = new Date().getMinutes();

    // Check if the reminder is within the start and end time range
    if (currentTime >= startTime && currentTime <= endTime && currentMinute % intervalMinutes === 0 && user.device_token) {
        await sendPushNotification(user.device_token, "It's time for your scheduled task!", "userApp");
    }
};

// Check 'custom' type reminder (custom weekly or specific days reminders)
const checkCustomReminder = async (user, reminder, weeklyTimes) => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase();
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

    if (weeklyTimes && weeklyTimes[currentDay] === currentTime && user.device_token) {
        let reminderMessage = "";

        switch (reminder.reminder_type) {
            case "step":
                reminderMessage = "Time to walk and get your steps in!";
                break;
            case "workout":
                reminderMessage = "Time for your workout session!";
                break;
            case "knowledge":
                reminderMessage = "Time for your knowledge session!";
                break;
            case "nutrition":
                reminderMessage = "Time to focus on your nutrition!";
                break;
            default:
                reminderMessage = "Reminder!";
        }

        await sendPushNotification(user.device_token, reminderMessage, "userApp");
    }
};

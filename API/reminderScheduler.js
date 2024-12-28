const cron = require("node-cron");
const { sendPushNotification } = require("./utils/firebaseService");
const Reminder = require("./models/Reminder");
const User = require("./models/User");
const MealReminder = require("./models/MealReminder");
const WaterReminder = require("./models/WaterReminder");

cron.schedule("* * * * *", async () => {
    console.log("Checking reminders...");
    try {
        const users = await User.find({});

        for (let user of users) {
            if (!user.device_token) continue;

            const mealReminders = await MealReminder.find({ userId: user._id });
            const waterReminders = await WaterReminder.find({ userId: user._id });
            const otherReminders = await Reminder.find({ userId: user._id });

            const reminders = [
                ...mealReminders.map(reminder => ({ ...reminder.toObject(), type: "meal" })),
                ...waterReminders.map(reminder => ({ ...reminder.toObject(), type: "water" })),
                ...otherReminders.map(reminder => ({
                    ...reminder.toObject(),
                    type: reminder.reminder_type || "other"
                }))
            ];

            for (let reminder of reminders) {
                const {
                    reminderType,
                    meals,
                    reminderTime,
                    weeklyTimes,
                    reminderOn,
                    type,
                    customTimes,
                    intervalMinutes,
                    startTime,
                    endTime
                } = reminder;

                if (!reminderOn) continue;

                if (type === "meal" && meals) {
                    await checkMealReminders(user, meals);
                } else if (type === "water") {
                    await checkWaterReminders(user, reminder);
                } else if (["step", "workout", "knowledge", "nutrition"].includes(type)) {
                    await checkOtherReminders(user, reminder);
                }
            }
        }
    } catch (error) {
        console.error("Error checking reminders: ", error);
    }
});

const checkMealReminders = async (user, meals) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const [hours, minutes] = currentTime.split(":");
    // console.log(`${hours}:${minutes}`);

    for (let mealType in meals) {
        const meal = meals[mealType];
        // console.log(meal.enabled && meal.time === `${hours}:${minutes}`,'=============meal time')
        if (meal.enabled && meal.time ===  `${hours}:${minutes}`) {
            await sendPushNotification(user.device_token, `Time for ${mealType}`, user._id, "userApp");
        }
    }
};

const checkWaterReminders = async (user, reminder) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const [hours, minutes] = currentTime.split(":");
    // console.log(`${hours}:${minutes}`);

    const currentMinute = new Date().getMinutes();

    // console.log(reminder.reminderTime, '=============currentTime========', `${hours}:${minutes}`)

    if (reminder.reminderType === "once" && reminder.reminderTime === `${hours}:${minutes}`) {
        // console.log('water reminder...')
        await sendPushNotification(user.device_token, "Time to drink water!", user._id, "userApp");
    } else if (!reminder.reminderType && reminder.startTime <= `${hours}:${minutes}` && reminder.endTime >= `${hours}:${minutes}`) {
        const intervalSent = currentMinute % reminder.intervalMinutes === 0;
        const maxTimesReached = reminder.customTimes <= 0;

        // console.log(intervalSent && !maxTimesReached,'============intervalSent && !maxTimesReached=========')

        if (intervalSent && !maxTimesReached) {
            await sendPushNotification(user.device_token, "Time to drink water!", user._id, "userApp");

            reminder.customTimes -= 1;
            await reminder.save();
        }
    }
};

const checkOtherReminders = async (user, reminder) => {
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const [hours, minutes] = currentTime.split(":");
    console.log(`${hours}:${minutes}`);
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase();

    let reminderMessage = "";

    switch (reminder.type) {
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

    if (reminder.reminderType === "once" && reminder.onceTime === `${hours}:${minutes}`) {
        await sendPushNotification(user.device_token, reminderMessage, user._id, "userApp");
    } else if (reminder.reminderType === "everyday" && reminder.everydayTime === `${hours}:${minutes}`) {
        await sendPushNotification(user.device_token, reminderMessage, user._id, "userApp");
    } else if (
        reminder.reminderType === "specificDays" && reminder.weeklyTimes[currentDay] === `${hours}:${minutes}`
    ) {
        await sendPushNotification(user.device_token, reminderMessage, user._id, "userApp");
    }
};

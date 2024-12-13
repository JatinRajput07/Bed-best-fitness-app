const cron = require("node-cron");

const { sendPushNotification } = require("./utils/firebaseService");
const Reminder = require("./models/Reminder");
const User = require("./models/User");

cron.schedule("* * * * *", async () => {
    console.log("Checking reminders...");
    try {
        const reminders = await Reminder.find({ isActive: true });

        for (let reminder of reminders) {
            const { userId, category, repeatType, meal, water, steps, workout, knowledgeSession, nutrition } = reminder;

            // Get user details
            const user = await User.findById(userId);
            if (!user) {
                console.log(`User not found for reminder ${reminder._id}`);
                continue;
            }

            if (repeatType === "daily") {
                await checkAndSendNotification(user, reminder, category, "daily");
            } else if (repeatType === "custom") {
                await checkAndSendNotification(user, reminder, category, "custom");
            }
        }
    } catch (error) {
        console.error("Error checking reminders: ", error);
    }
});

const checkAndSendNotification = async (user, reminder, category, repeatType) => {
    const { meal, water, steps, workout, knowledgeSession, nutrition } = reminder;
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });

    if (category === "meal" && meal?.on) {
        await checkMealReminders(user, meal, currentTime);
    }

    if (category === "water" && water?.on) {
        await checkWaterReminders(user, water, currentTime);
    }

    if (category === "steps" && steps?.on) {
        await checkStepsReminders(user, steps, currentTime, currentDay);
    }

    if (category === "workout" && workout?.on) {
        await checkWorkoutReminders(user, workout, currentTime);
    }

    if (category === "knowledge" && knowledgeSession?.on) {
        await checkKnowledgeSessionReminders(user, knowledgeSession, currentTime, currentDay);
    }

    if (category === "nutrition" && nutrition?.on) {
        await checkNutritionReminders(user, nutrition, currentTime);
    }
};

const checkMealReminders = async (user, meal, currentTime) => {
    const meals = meal.daily;
    for (let key in meals) {
        const mealTime = meals[key]?.time;
        const mealMessage = meals[key]?.message;
        if (mealTime && currentTime === mealTime && user.device_token) {
            await sendPushNotification(user.device_token, mealMessage, "userApp");
        }
    }
};

const checkWaterReminders = async (user, water, currentTime) => {
    if (water.daily?.time && currentTime === water.daily?.time && user.device_token) {
        await sendPushNotification(user.device_token, "Time to drink water!", "userApp");
    }
};

const checkStepsReminders = async (user, steps, currentTime, currentDay) => {
    for (let stepReminder of steps.custom) {
        if (stepReminder.day === currentDay && stepReminder.time === currentTime && user.device_token) {
            await sendPushNotification(user.device_token, stepReminder.message, "userApp");
        }
    }
};

const checkWorkoutReminders = async (user, workout, currentTime) => {
    if (workout.daily?.time === currentTime && user.device_token) {
        await sendPushNotification(user.device_token, workout.daily?.message, "userApp");
    }
};

const checkKnowledgeSessionReminders = async (user, knowledgeSession, currentTime, currentDay) => {
    for (let session of knowledgeSession.custom) {
        if (session.day === currentDay && session.time === currentTime && user.device_token) {
            await sendPushNotification(user.device_token, session.message, "userApp");
        }
    }
};

const checkNutritionReminders = async (user, nutrition, currentTime) => {
    if (nutrition.daily?.time === currentTime && user.device_token) {
        await sendPushNotification(user.device_token, nutrition.daily?.message, "userApp");
    }
};



const cron = require('node-cron');
const User = require('./models/User');
const Reminder = require('./models/Reminder');
const moment = require('moment');

module.exports = (io) => {
    // Run every minute to check reminders
    cron.schedule('* * * * *', async () => {
        try {
            const now = moment();
            const day = now.format('dddd');
            const time = now.format('HH:mm');

            // Fetch all active reminders for the current time and day
            const reminders = await Reminder.find({
                isActive: true,
                Days: day,
            });

            for (const reminder of reminders) {
                const { userId, category, timeSettings } = reminder;
                let isMatch = false;
                switch (category) {
                    case 'steps':
                        isMatch = time === timeSettings.steptReminder?.startTime;
                        break;
                    case 'water':
                        if (time === timeSettings.waterReminder?.startTime || time === timeSettings.waterReminder?.endTime) {
                            isMatch = true;
                        }
                        break;
                    case 'meal':
                        Object.values(timeSettings.mealTimes || {}).forEach(mealTime => {
                            if (time === mealTime) isMatch = true;
                        });
                        break;
                    case 'nutrition':
                        isMatch = time === timeSettings.nutritionReminder?.startTime;
                        break;
                    case 'knowledge':
                        break;
                    case 'workout':
                        isMatch = time === timeSettings.workoutReminder?.startTime;
                        break;
                    default:
                        break;
                }

                if (isMatch) {
                    const user = await User.findById(userId);
                    if (user && user.socketId) {
                        io.to(user.socketId).emit('reminder_notification', {
                            message: `It's time for your ${category} reminder!`,
                            category,
                            time,
                        });
                    } else {
                        console.log(`User ${userId} is offline. Notification skipped.`);
                    }
                }
            }
        } catch (err) {
            console.error('Error in reminder scheduler:', err);
        }
    });
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReminderSettings = ({ userId }) => {
  const [reminderSettings, setReminderSettings] = useState({
    reminderEnabled: false,
    meals: {
      wakeupFood: { enabled: false, time: '' },
      breakfast: { enabled: false, time: '' },
      morningSnacks: { enabled: false, time: '' },
      lunch: { enabled: false, time: '' },
      eveningSnacks: { enabled: false, time: '' },
      dinner: { enabled: false, time: '' }
    },
    step: { reminderType: 'once', onceTime: '', everydayTime: '', weeklyTimes: {} },
    workout: { reminderType: 'once', onceTime: '', everydayTime: '', weeklyTimes: {} },
    knowledge: { reminderType: 'once', onceTime: '', everydayTime: '', weeklyTimes: {} },
    nutrition: { reminderType: 'once', onceTime: '', everydayTime: '', weeklyTimes: {} },
    water: { reminderEnabled: false, reminderType: 'once', reminderTime: '', startTime: '', endTime: '', intervalMinutes: 15 }
  });

  // Fetch existing reminder settings
  useEffect(() => {
    const fetchReminderSettings = async () => {
      try {
        const response = await axios.get(`/getReminder/${userId}`);
        setReminderSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch reminder settings:', error);
      }
    };

    fetchReminderSettings();
  }, [userId]);

  // Handle changes and update the backend
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let updatedSettings = { ...reminderSettings };

    if (type === 'checkbox') {
      updatedSettings[name].enabled = checked;
    } else if (type === 'radio') {
      updatedSettings[name] = value;
    } else {
      updatedSettings[name] = value;
    }

    setReminderSettings(updatedSettings);

    try {
      await axios.post('/setReminder', updatedSettings);
    } catch (error) {
      console.error('Failed to update reminder settings:', error);
    }
  };

  return (
    <div>
      <h2>Reminder Settings</h2>

      {/* Meal Reminders */}
      <div>
        <h3>Meal Reminders</h3>
        {Object.keys(reminderSettings.meals).map((meal) => (
          <div key={meal}>
            <label>
              {meal.charAt(0).toUpperCase() + meal.slice(1)}:
              <input
                type="checkbox"
                name={`meals.${meal}.enabled`}
                checked={reminderSettings.meals[meal].enabled}
                onChange={handleChange}
              />
              {reminderSettings.meals[meal].enabled && (
                <input
                  type="time"
                  name={`meals.${meal}.time`}
                  value={reminderSettings.meals[meal].time}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
      </div>

      {/* Step Reminder */}
      <div>
        <h3>Step Reminder</h3>
        <input
          type="radio"
          name="step.reminderType"
          value="once"
          checked={reminderSettings.step.reminderType === 'once'}
          onChange={handleChange}
        /> Once
        <input
          type="radio"
          name="step.reminderType"
          value="everyday"
          checked={reminderSettings.step.reminderType === 'everyday'}
          onChange={handleChange}
        /> Everyday
        <input
          type="radio"
          name="step.reminderType"
          value="specificDays"
          checked={reminderSettings.step.reminderType === 'specificDays'}
          onChange={handleChange}
        /> Specific Days
        {reminderSettings.step.reminderType === 'everyday' && (
          <input
            type="time"
            name="step.everydayTime"
            value={reminderSettings.step.everydayTime}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Similar UI for Workout, Knowledge, Nutrition, and Water */}
      {/* Continue adding for workout, knowledge, nutrition, and water reminders */}

    </div>
  );
};

export default ReminderSettings;

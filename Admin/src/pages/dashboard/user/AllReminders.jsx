import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Alert,
    Chip,
} from "@mui/material";

const AllReminders = ({ userId }) => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get(
                    `http://43.204.2.84:7200/admin/user/reminders/${userId}`
                );
                setReminders(response.data.reminders);
            } catch (err) {
                setError("Failed to fetch reminders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReminders();
    }, [userId]);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );

    // No reminders case
    if (reminders.length === 0)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
                maxHeight="10vh"
                textAlign="center"
            >
                <Typography variant="h6" color="text.secondary">
                    User has not set any reminders.
                </Typography>
            </Box>
        );

    const getReminderColor = (type) => {
        switch (type) {
            case "meal":
                return { bg: "#E3F2FD", chipBg: "#FFC107", chipColor: "#000" };
            case "water":
                return { bg: "#E8F5E9", chipBg: "#29B6F6", chipColor: "#fff" };
            case "step":
                return { bg: "#FBE9E7", chipBg: "#FF7043", chipColor: "#fff" };
            case "workout":
                return { bg: "#FBE9E7", chipBg: "#FF7043", chipColor: "#fff" };
            case "knowledge":
                return { bg: "#F5F5F5", chipBg: "#9E9E9E", chipColor: "#fff" };
            case "nutrition":
                return { bg: "#F5F5F5", chipBg: "#9E9E9E", chipColor: "#fff" };
            default:
                return { bg: "#F5F5F5", chipBg: "#9E9E9E", chipColor: "#fff" };
        }
    };

    const renderReminderDetails = (reminder) => {
        const { bg, chipBg, chipColor } = getReminderColor(reminder?.type);
        return (
            <Grid item xs={12} sm={6} md={4} key={reminder._id}>
                <Card sx={{ position: "relative", backgroundColor: bg, boxShadow: 3 }}>
                    <Chip
                        label={reminder?.type.charAt(0).toUpperCase() + reminder?.type.slice(1)}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: chipBg,
                            color: chipColor,
                            fontWeight: "bold",
                        }}
                    />
                    <CardContent sx={{ height: "100%" }}>
                        <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                            {reminder?.type === "meal" ? "Meal Schedule" : `${reminder?.type} Reminder`}
                        </Typography>

                        {/* Render Meal Details */}
                        {reminder?.type === "meal" &&
                            Object.entries(reminder?.meals || {}).map(
                                ([meal, details]) =>
                                    details.enabled && (
                                        <Box
                                            key={meal}
                                            p={1}
                                            mb={1}
                                            sx={{
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: 1,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    textTransform: "capitalize",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {meal}:
                                            </Typography>
                                            <Typography sx={{ color: "text.primary" }}>{details.time}</Typography>
                                        </Box>
                                    )
                            )}
                        {reminder.type === "water" && (
                            <>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Reminder Type:</strong> {reminder.reminderType}
                                </Typography>
                                {reminder.reminderType === "once" ? (
                                    <>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Reminder Time:</strong> {reminder.reminderTime}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Interval:</strong> Every {reminder.intervalMinutes} minutes
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Start Time:</strong> {reminder.startTime}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>End Time:</strong> {reminder.endTime}
                                        </Typography>
                                    </>
                                )}
                            </>
                        )}


                        {/* Render Step Reminder Details */}
                        {reminder.type === "step" && (
                            <>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Reminder Type:</strong> {reminder.reminderType}
                                </Typography>
                                {reminder.reminderType === "specificDays" && (
                                    <>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                            Weekly Times:
                                        </Typography>
                                        <ul style={{ padding: 0, listStyle: "none" }}>
                                            {Object.entries(reminder.weeklyTimes || {}).map(([day, time]) => (
                                                <li key={day}>
                                                    <Typography variant="body2">
                                                        <strong>{day}:</strong> {time}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}

                        {/* Render Workout Reminder Details */}
                        {reminder.type === "workout" && (
                            <>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Reminder Type:</strong> {reminder.reminderType}
                                </Typography>
                                {reminder.reminderType === "specificDays" && (
                                    <>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                            Weekly Times:
                                        </Typography>
                                        <ul style={{ padding: 0, listStyle: "none" }}>
                                            {Object.entries(reminder.weeklyTimes || {}).map(([day, time]) => (
                                                <li key={day}>
                                                    <Typography variant="body2">
                                                        <strong>{day}:</strong> {time}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}

                        {/* Render Knowledge Reminder Details */}
                        {reminder.type === "knowledge" && (
                            <>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Reminder Type:</strong> {reminder.reminderType}
                                </Typography>
                                {reminder.reminderType === "specificDays" && (
                                    <>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                            Weekly Times:
                                        </Typography>
                                        <ul style={{ padding: 0, listStyle: "none" }}>
                                            {Object.entries(reminder.weeklyTimes || {}).map(([day, time]) => (
                                                <li key={day}>
                                                    <Typography variant="body2">
                                                        <strong>{day}:</strong> {time}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}

                        {/* Render Nutrition Reminder Details */}
                        {reminder.type === "nutrition" && (
                            <>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Reminder Type:</strong> {reminder.reminderType}
                                </Typography>
                                {reminder.reminderType === "specificDays" && (
                                    <>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                                            Weekly Times:
                                        </Typography>
                                        <ul style={{ padding: 0, listStyle: "none" }}>
                                            {Object.entries(reminder.weeklyTimes || {}).map(([day, time]) => (
                                                <li key={day}>
                                                    <Typography variant="body2">
                                                        <strong>{day}:</strong> {time}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "100vh" }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 6, color: "text.primary" }}
            >
                User Reminders
            </Typography>
            <Grid container spacing={3}>
                {reminders.map((reminder) => renderReminderDetails(reminder))}
            </Grid>
        </Box>
    );
};

export default AllReminders;

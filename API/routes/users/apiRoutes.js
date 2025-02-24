const express = require('express');
const router = express.Router();

// Middleware
const Auth = require('../../middleware/Auth');
const { registrationValidation } = require('../../middleware/Validation/userValidation');

// Controllers
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    addRoutine,
    getRoutine,
    getProfile,
    contact_us,
    verifyOTP,
    createRecommendation,
    deleteRecommendation,
    getUserRecommendations,
    Home,
    getVideosByCategory,
    get_asign_users,
    updateRoutineSection,
    addReminder,
    getUserReminders,
    socialLogin,
    userUploadFiles,
    getUploadFiles,
    verifyAccount,
    createBodydata,
    getBodydata,
    getBodyMeasurement,
    getHealthHabits,
    getHygiene,
    getHolisticWellness,
    getWhatNewToday,
    createOrUpdateBodyMeasurement,
    createOrUpdateHealthHabits,
    createOrUpdateHygiene,
    createOrUpdateHolisticWellness,
    createOrUpdateWhatNewToday,
    deleteAccount,
    get_asign_users_details,
    getNotification,
    createOrUpdateHealtyHabitRoutine,
    resendOtp,
    deleteUserUploadFiles,
    logout,
    getIntro,
    uploadProfilePicture,
    getProfilePicture,
    getMeetings,
    getMeetingsByCategory
} = require('../../controllers/userController');

const {
    createGoal,
    getUserGoal,
    getUserHealthData,
    getMetricData,
    getMindnessfull,
    getMindnessfullByCategory,
    getMeals,
    getNutritions,
    get_sleep_records,
    getStepData
} = require('../../controllers/goalController');

// Authentication Routes
router.post('/register', registrationValidation, register); // User registration
router.post('/verifyAccount', verifyAccount); // User account verification
router.post('/login', login); // User login
router.post('/social_login', socialLogin); // Social login
router.post('/forgotPassword', forgotPassword); // Forgot password
router.post('/verify_otp', verifyOTP); // OTP verification
router.patch('/resetPassword', resetPassword); // Reset password
router.post('/resend_otp', resendOtp);


router.get('/intro', getIntro); // Get sleep records

// Recommendations Management
router.get('/recommendation', getUserRecommendations); // Get user recommendations
router.post('/recommendation', createRecommendation); // Create a recommendation
router.delete('/recommendation', deleteRecommendation); // Delete a recommendation

// Protected Routes (Requires Auth Middleware)
router.use(Auth);

// Profile Management
router.patch('/updateMyPassword', updatePassword); // Update user password
router.patch('/updateProfile', updateProfile); // Update user profile
router.get('/getProfile', getProfile); // Get user profile
router.delete('/delete_account', deleteAccount); // Get user profile
router.post('/uploadProfilePicture',uploadProfilePicture)
router.get('/getProfilePicture',getProfilePicture)



// User Goal Management
router.post('/set_goal', createGoal); // Add user goal
router.get('/get_goal', getUserGoal); // Get user goal

// User Upload File Management (Feed and Blood Report)
router.post('/user-upload-file', userUploadFiles);
router.delete('/user-upload-file/:id', deleteUserUploadFiles); 
router.get('/get-upload-file', getUploadFiles); // Get user files

// Routine Management
router.post('/routine', addRoutine); // Add a routine
router.get('/routine', getRoutine); // Get routine details

router.patch('/update/:section', updateRoutineSection); // Update routine section

router.patch('/body_data', createBodydata)
// router.get('/getBodydata', getBodydata)

router.patch('/body_measurement', createOrUpdateBodyMeasurement);
// router.get('/body_measurement', getBodyMeasurement);

// Health Habits
router.post('/health_habits', createOrUpdateHealtyHabitRoutine);
router.get('/health_habits', getHealthHabits);

// Hygiene
// router.post('/hygiene', createOrUpdateHygiene);
// router.get('/hygiene', getHygiene);

// Holistic Wellness
// router.post('/holistic_wellness', createOrUpdateHolisticWellness);
// router.get('/holistic_wellness', getHolisticWellness);

// What New Today
// router.post('/what_new_today', createOrUpdateWhatNewToday);
// router.get('/what_new_today', getWhatNewToday);

// Home and Videos
router.get('/home', Home); // Home data
router.get('/video/:category', getVideosByCategory); // Get videos by category

// Contact Us
router.post('/contact_us', contact_us); // Contact us form submission

// Host-only Routes
router.get('/asign_users', get_asign_users); // Get assigned users
router.get('/asign_users_details/:id', get_asign_users_details)

// Reminders
router.post('/reminders', addReminder); // Add a reminder
router.get('/reminders/:category', getUserReminders); // Get user reminders

// Health and Wellness
router.get('/userHealthData', getMetricData); // Get user health data
router.get('/mindfulness', getMindnessfull); // Get mindfulness data
router.get('/mindfulness/:category', getMindnessfullByCategory); // Get mindfulness data by category
router.get('/meal', getMeals); // Get meals
router.get('/nutrition', getNutritions); // Get nutrition data
router.get('/get_sleep_records', get_sleep_records); // Get sleep records

router.get('/notification', getNotification); // Get sleep records


router.get('/getStepData',getStepData)

router.get('/meetings',getMeetings)
router.get('/meeting/:category',getMeetingsByCategory)



router.post('/logout', logout); // Get sleep records



module.exports = router;

const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/Auth');
const { registrationValidation } = require('../../middleware/Validation/userValidation');
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
    verifyAccount
} = require('../../controllers/userController');
const { createGoal, getUserGoal, getUserHealthData, getMetricData, getMindnessfull, getMindnessfullByCategory, getMeals, getNutritions, get_sleep_records } = require('../../controllers/goalController');

// Authentication Routes
router.post('/register', registrationValidation, register); // User registration
router.post('/verifyAccount', verifyAccount); // User Account Verify
router.post('/login', login); // User login
router.post('/social_login', socialLogin)
router.post('/forgotPassword', forgotPassword); // Forgot password
router.post('/verif_otp', verifyOTP); // OTP verification
router.patch('/resetPassword', resetPassword); // Reset password

// Protected Routes (Requires Auth Middleware)
router.use(Auth);


// Profile Management
router.patch('/updateMyPassword', updatePassword); // Update user password
router.patch('/updateProfile', updateProfile); // Update user profile
router.get('/getProfile', getProfile); // Get user profile


// User Goal Management
router.post('/set_goal', createGoal); // Add user Goal
router.get('/get_goal', getUserGoal); // Get user Goal


// User Upload File ( FEED and BLOOD REPORT )
router.post('/user-upload-file', userUploadFiles); // Add user Files
router.get('/get-upload-file', getUploadFiles); //get  User Files                    


// Routine Management
router.post('/routine', addRoutine); // Add a routine
router.get('/routine', getRoutine); // Get routine details

// Home and Video
router.get('/home', Home); // Home data
router.get('/video/:category', getVideosByCategory); // Get videos by category

// Update Routes for Specific Sections
// router.patch('/update/:water', updateWater); // Update water intake
// router.patch('/update/:meal', updateMeal); // Update meal details
// router.patch('/update/:steps', updateSteps); // Update steps data
// router.patch('/update/:workout', updateWorkout); // Update workout details
// router.patch('/update/:join-session', updateJoinSession); // Update join session status
// router.patch('/update/:nutrition', updateNutrition); // Update nutrition details
// router.patch('/update/:sleep', updateSleep); // Update sleep data
// router.patch('/update/:body-data', updateBodyData); // Update body data
router.patch('/update/:section', updateRoutineSection);


// Contact Us
router.post('/contact_us', contact_us); // Contact us form submission

// Recommendations Management
router.get('/recommendation', getUserRecommendations); // Get user recommendations
router.post('/recommendation', createRecommendation); // Create a recommendation
router.delete('/recommendation', deleteRecommendation); // Delete a recommendation

// Host-only Routes
router.get("/asign_users", get_asign_users); // Get assigned users


router.post("/reminders", addReminder);
router.get("/reminders", getUserReminders);

router.get("/userHealthData", getMetricData)

router.get("/mindfulness", getMindnessfull)
router.get("/mindfulness/:category", getMindnessfullByCategory)


router.get('/meal', getMeals);
router.get('/nutrition', getNutritions); 

router.get('/get_sleep_records', get_sleep_records); 

module.exports = router;

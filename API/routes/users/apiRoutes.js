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
    updateMeal, 
    updateWater, 
    updateSteps, 
    updateWorkout, 
    updateJoinSession, 
    updateNutrition, 
    updateSleep, 
    updateBodyData, 
    getRoutine, 
    getProfile, 
    contact_us, 
    verifyOTP, 
    createRecommendation, 
    deleteRecommendation, 
    getUserRecommendations, 
    Home, 
    getVideosByCategory, 
    get_asign_users 
} = require('../../controllers/userController');

// Authentication Routes
router.post('/register', registrationValidation, register); // User registration
router.post('/login', login); // User login
router.post('/forgotPassword', forgotPassword); // Forgot password
router.post('/verif_otp', verifyOTP); // OTP verification
router.patch('/resetPassword', resetPassword); // Reset password

// Protected Routes (Requires Auth Middleware)
router.use(Auth);

// Profile Management
router.patch('/updateMyPassword', updatePassword); // Update user password
router.patch('/updateProfile', updateProfile); // Update user profile
router.get('/getProfile', getProfile); // Get user profile

// Routine Management
router.post('/routine', addRoutine); // Add a routine
router.get('/routine', getRoutine); // Get routine details

// Home and Video
router.get('/home', Home); // Home data
router.get('/video/:category', getVideosByCategory); // Get videos by category

// Update Routes for Specific Sections
router.patch('/update/water', updateWater); // Update water intake
router.patch('/update/meal', updateMeal); // Update meal details
router.patch('/update/steps', updateSteps); // Update steps data
router.patch('/update/workout', updateWorkout); // Update workout details
router.patch('/update/join-session', updateJoinSession); // Update join session status
router.patch('/update/nutrition', updateNutrition); // Update nutrition details
router.patch('/update/sleep', updateSleep); // Update sleep data
router.patch('/update/body-data', updateBodyData); // Update body data

// Contact Us
router.post('/contact_us', contact_us); // Contact us form submission

// Recommendations Management
router.get('/recommendation', getUserRecommendations); // Get user recommendations
router.post('/recommendation', createRecommendation); // Create a recommendation
router.delete('/recommendation', deleteRecommendation); // Delete a recommendation

// Host-only Routes
router.get("/asign_users", get_asign_users); // Get assigned users

module.exports = router;

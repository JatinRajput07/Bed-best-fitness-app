const express = require('express');
const router = express.Router();
const Auth = require('../../middleware/Auth')
const { registrationValidation } =  require('../../middleware/Validation/userValidation');
const { register, login, forgotPassword, resetPassword, updatePassword, updateProfile, addRoutine, updateMeal, updateWater, updateSteps, updateWorkout, updateJoinSession, updateNutrition, updateSleep, updateBodyData, getRoutine, getProfile, contact_us, verifyOTP } = require('../../controllers/userController');


router.post('/register', registrationValidation , register )
router.post('/login', login  )
router.post('/forgotPassword', forgotPassword  )
router.post('/verif_otp', verifyOTP  )
router.patch('/resetPassword', resetPassword  )



router.use(Auth);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateProfile',updateProfile)
router.get('/getProfile',getProfile)


router.post('/routine',addRoutine)
router.get('/routine',getRoutine)

router.patch('/update/meal', updateMeal);
router.patch('/update/water', updateWater);
router.patch('/update/steps', updateSteps);
router.patch('/update/workout', updateWorkout);
router.patch('/update/join-session', updateJoinSession);
router.patch('/update/nutrition', updateNutrition);
router.patch('/update/sleep', updateSleep);
router.patch('/update/body-data', updateBodyData);


router.post('/contact_us', contact_us);






module.exports = router;
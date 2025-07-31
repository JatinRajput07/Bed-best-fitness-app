const express = require('express');
const { getWaterTracking, getStepTracking, getSleepData, getMealsData, getNutritionData, getWorkoutData, getBodyData, getBodyMeasurementParameters, getHygieneData, getWhatNewToday, getHolisticWellness, getHealthHabits, getknowledgeData, AdmingetUserImages, comment_meal, get_comment_meal } = require('../../controllers/adminUserDetail');
const router = express.Router();

router.get("/getWaterTracking/:userId/getWaterTracking", getWaterTracking)
router.get("/getStepTracking/:userId/getStepTracking", getStepTracking)
router.get("/getSleepData/:userId/getSleepData", getSleepData)
router.get("/getMealsData/:userId/getMealsData", getMealsData)
router.get("/getNutritionData/:userId/getNutritionData", getNutritionData)
router.get("/getBodyData/:userId/getBodyData", getBodyData)
router.get("/getBodyMeasurementParameters/:userId/getBodyMeasurementParameters", getBodyMeasurementParameters)


router.get("/getWorkoutData/:userId/getWorkoutData", getWorkoutData)
router.get("/getknowledgeData/:userId/getknowledgeData", getknowledgeData)


router.get("/getHealthHabits/:userId/getHealthHabits", getHealthHabits)
router.get("/getHygieneData/:userId/getHygieneData", getHygieneData)
router.get("/getHolisticWellness/:userId/getHolisticWellness", getHolisticWellness)
router.get("/getWhatNewToday/:userId/getWhatNewToday", getWhatNewToday)

router.get('/get-user-images', AdmingetUserImages);

router.post('/routine/:userId/:date/:mealType/comment', comment_meal);
// router.get('/routine/:userId/:date/:mealType/comments', get_comment_meal);


module.exports = router;

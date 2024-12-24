const { default: mongoose } = require("mongoose");
const Meal = require("../models/Meal");
const Routine = require("../models/Routine");
const Goal = require("../models/userGoal");
const catchAsync = require("../utils/catchAsync");

exports.getWaterTracking = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const goalData = await Goal.findOne({ userId }, 'dailyWaterGoal -_id');
    const routineData = await Routine.find({ userId }, 'water date -_id');
    const waterAchive = routineData.filter(r => r.water).map(r => ({ date: r.date, value: r.water }));

    res.status(200).json({
        status: "success",
        dailyGoal: goalData?.dailyWaterGoal || null,
        waterAchive,
    });
});



exports.getStepTracking = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const goalData = await Goal.findOne({ userId }, 'dailyStepsGoal -_id');
    const routineData = await Routine.find({ userId }, 'steps date -_id');
    const stepAchive = routineData.filter(r => r.steps).map(r => ({ date: r.date, value: r.steps }));
    res.status(200).json({
        status: "success",
        dailyGoal: goalData?.dailyStepsGoal || null,
        stepAchive,
    });
});


exports.getSleepData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'sleep date -_id').sort({ date: -1 });
    const sleep = routineData.filter(r => r.sleep).map(r => ({ date: r.date, value: r.sleep }));

    res.status(200).json({
        status: "success",
        sleep,
    });
});


exports.getMealsData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const routineData = await Routine.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $project: {
                date: 1,
                meal: {
                    $objectToArray: "$meal",
                },
            },
        },
        { $unwind: "$meal" },
        {
            $addFields: {
                "meal.v.items": {
                    $map: {
                        input: "$meal.v.items",
                        as: "item",
                        in: { $convert: { input: "$$item", to: "objectId", onError: null, onNull: null } },
                    },
                },
            },
        },
        {
            $lookup: {
                from: "meals",
                localField: "meal.v.items",
                foreignField: "_id",
                as: "mealItems",
            },
        },
        {
            $group: {
                _id: "$_id",
                date: { $first: "$date" },
                meal: {
                    $push: {
                        k: "$meal.k",
                        v: {
                            $mergeObjects: [
                                "$meal.v",
                                { items: { $map: { input: "$mealItems", as: "item", in: "$$item.item" } } },
                            ],
                        },
                    },
                },
            },
        },
        {
            $addFields: {
                meal: {
                    $arrayToObject: "$meal",
                },
            },
        },
        {
            $project: {
                _id: 0,
                date: 1,
                value: "$meal",
            },
        },

        { $sort: { date: -1 } },
    ]);

    res.status(200).json({
        status: "success",
        meals: routineData,
    });
});




exports.getNutritionData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const nutritionData = await Routine.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $match: { nutrition: { $exists: true, $ne: [] } } },
        { $unwind: "$nutrition" },
        {
            $addFields: {
                "nutrition.item": { $convert: { input: "$nutrition.item", to: "objectId", onError: null, onNull: null } },
            },
        },
        {
            $lookup: {
                from: "nutritions",
                localField: "nutrition.item",
                foreignField: "_id",
                as: "nutritionDetails",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "nutritionDetails.coachId",
                foreignField: "_id",
                as: "coachDetails",
            },
        },
        {
            $addFields: {
                "nutrition.itemDetails": { $arrayElemAt: ["$nutritionDetails", 0] },
                "nutrition.coach": { $arrayElemAt: ["$coachDetails", 0] },
            },
        },
        {
            $group: {
                _id: "$date",
                nutrition: {
                    $push: {
                        itemId: "$nutrition.item",
                        mealTime: "$nutrition.itemDetails.mealTime",
                        description: "$nutrition.itemDetails.description",
                        // quantity: "$nutrition.itemDetails.quantity",
                        coach: {
                            name: "$nutrition.coach.name",
                            email: "$nutrition.coach.email",
                        },
                        status: "$nutrition.status",
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                value: "$nutrition",
            },
        },
        { $sort: { date: -1 } },
    ]);

    res.status(200).json({
        status: "success",
        nutrition: nutritionData,
    });
});


exports.getWorkoutData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'workout date -_id').sort({ date: -1 });
    const workout = routineData.filter(r => r.workout).map(r => ({ date: r.date, value: r.workout }));
    res.status(200).json({
        status: "success",
        workout,
    });
});


exports.getBodyData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'body_data date -_id');
    const bodyData = routineData.filter(r => r.body_data).map(r => ({ date: r.date, value: r.body_data }));

    res.status(200).json({
        status: "success",
        bodyData,
    });
});


exports.getBodyMeasurementParameters = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'body_measurement_parameters date -_id');
    const bodyMeasurementParameters = routineData
        .filter(r => r.body_measurement_parameters)
        .map(r => ({ date: r.date, value: r.body_measurement_parameters }));

    res.status(200).json({
        status: "success",
        bodyMeasurementParameters,
    });
});


exports.getHealthHabits = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'health_habits date -_id');
    const healthHabits = routineData.filter(r => r.health_habits).map(r => ({ date: r.date, value: r.health_habits }));

    res.status(200).json({
        status: "success",
        healthHabits,
    });
});


exports.getHygieneData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'hygiene date -_id');
    const hygiene = routineData.filter(r => r.hygiene).map(r => ({ date: r.date, value: r.hygiene }));

    res.status(200).json({
        status: "success",
        hygiene,
    });
});


exports.getHolisticWellness = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'holistic_wellness date -_id');
    const holisticWellness = routineData
        .filter(r => r.holistic_wellness)
        .map(r => ({ date: r.date, value: r.holistic_wellness }));

    res.status(200).json({
        status: "success",
        holisticWellness,
    });
});


exports.getWhatNewToday = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'what_new_today date -_id');
    const whatNewToday = routineData.filter(r => r.what_new_today).map(r => ({ date: r.date, value: r.what_new_today }));

    res.status(200).json({
        status: "success",
        whatNewToday,
    });
});

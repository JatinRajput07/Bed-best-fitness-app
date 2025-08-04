const { default: mongoose } = require("mongoose");
const Meal = require("../models/Meal");
const Routine = require("../models/Routine");
const Goal = require("../models/userGoal");
const catchAsync = require("../utils/catchAsync");
const UserFiles = require("../models/UserFiles");

exports.getWaterTracking = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const goalData = await Goal.findOne({ userId }, 'dailyWaterGoal -_id');
    const routineData = await Routine.find({ userId }, 'water date -_id').sort({ date: -1 });
    const waterAchive = routineData.filter(r => r.water).map(r => ({ date: r.date, value: r.water }));

    console.log(waterAchive, '===waterAchive==')

    res.status(200).json({
        status: "success",
        dailyGoal: goalData?.dailyWaterGoal || null,
        waterAchive,
    });
});


exports.getStepTracking = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const goalData = await Goal.findOne({ userId }, 'dailyStepsGoal -_id');
    const routineData = await Routine.find({ userId }, 'steps date -_id').sort({ date: -1 });
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
                                { comments: "$meal.v.comments" }
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
        {
            $project: {
                date: 1,
                nutrition: {
                    $cond: {
                        if: { $isArray: "$nutrition" },
                        then: "$nutrition",
                        else: { $objectToArray: "$nutrition" },
                    },
                },
            },
        },
        { $unwind: "$nutrition" },
        {
            $lookup: {
                from: "nutritions",
                localField: "nutrition.v.items",
                foreignField: "_id",
                as: "nutritionItems",
            },
        },
        {
            $group: {
                _id: "$_id",
                date: { $first: "$date" },
                nutrition: {
                    $push: {
                        k: "$nutrition.k",
                        v: {
                            $mergeObjects: [
                                "$nutrition.v",
                                {
                                    items: {
                                        $map: {
                                            input: "$nutritionItems",
                                            as: "item",
                                            in: {
                                                name: "$$item.name",
                                                description: "$$item.description",
                                                quantity: "$$item.quantity"
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            $addFields: {
                nutrition: {
                    $arrayToObject: "$nutrition",
                },
            },
        },
        {
            $project: {
                _id: 0,
                date: 1,
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


exports.getknowledgeData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'join_session date -_id').sort({ date: -1 });
    const join_session = routineData.filter(r => r.join_session).map(r => ({ date: r.date, value: r.join_session }));
    res.status(200).json({
        status: "success",
        join_session,
    });
});



exports.getBodyData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'body_data date -_id').sort({ date: -1 });
    const bodyData = routineData.filter(r => r.body_data).map(r => ({ date: r.date, value: r.body_data }));

    res.status(200).json({
        status: "success",
        bodyData,
    });
});


exports.getBodyMeasurementParameters = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'body_measurement_parameters date -_id').sort({ date: -1 });
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
    const routineData = await Routine.find({ userId }, 'health_habits date -_id').sort({ date: -1 });
    const healthHabits = routineData.filter(r => r.health_habits).map(r => ({ date: r.date, value: r.health_habits }));

    res.status(200).json({
        status: "success",
        healthHabits,
    });
});


exports.getHygieneData = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'hygiene date -_id').sort({ date: -1 });
    const hygiene = routineData.filter(r => r.hygiene).map(r => ({ date: r.date, value: r.hygiene }));

    res.status(200).json({
        status: "success",
        hygiene,
    });
});


exports.getHolisticWellness = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const routineData = await Routine.find({ userId }, 'holistic_wellness date -_id').sort({ date: -1 });
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
    const routineData = await Routine.find({ userId }, 'what_new_today date -_id').sort({ date: -1 });
    const whatNewToday = routineData.filter(r => r.what_new_today).map(r => ({ date: r.date, value: r.what_new_today }));

    res.status(200).json({
        status: "success",
        whatNewToday,
    });
});


exports.deleteUserUploadFiles = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await UserFiles.findByIdAndDelete(id)
    }
    res.status(200).json({
        status: 'success',
        message: 'Blood Report File Deleted!.',
    });
})


exports.AdmingetUserImages = catchAsync(async (req, res, next) => {
    const userId = req.query.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
        UserFiles.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId), type: "image" },
            },
            {
                $project: {
                    _id: 1,
                    path: 1,
                    type: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]),
        UserFiles.countDocuments({ userId: userId, type: "image" })
    ]);

    return res.status(200).json({
        status: "success",
        data: images,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    });
});


exports.comment_meal = catchAsync(async (req, res) => {
    const { userId, date, mealType } = req.params;
    const { text, loginUser } = req.body;

    console.log(userId, date, mealType, '========== userId, date, mealType =======')
    console.log(text, '======================text==============')

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }
    const routine = await Routine.findOneAndUpdate(
        { date, userId },
        {
            $push: {
                [`meal.${mealType}.comments`]: { userId: loginUser, text, created_at: new Date() }
            }
        },
        { new: true, runValidators: true }
    );

    return res.status(200).json({ message: 'Comment added successfully', routine });
})

exports.delete_meal_comment = catchAsync(async (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        return res.status(400).json({ message: 'Comment ID is required' });
    }

    const routine = await Routine.findOne({
        $or: [
            { "meal.wake_up_food.comments._id": commentId },
            { "meal.breakfast.comments._id": commentId },
            { "meal.morning_snacks.comments._id": commentId },
            { "meal.lunch.comments._id": commentId },
            { "meal.evening_snacks.comments._id": commentId },
            { "meal.dinner.comments._id": commentId },
        ]
    });

    if (!routine) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    const mealType = Object.keys(routine.meal).find(type =>
        routine.meal[type].comments.some(comment => comment._id.toString() === commentId)
    );

    if (!mealType) {
        return res.status(404).json({ message: 'Comment not found in any meal type' });
    }

    await Routine.findOneAndUpdate(
        { _id: routine._id },
        {
            $pull: {
                [`meal.${mealType}.comments`]: { _id: commentId }
            }
        },
        { new: true }
    );

    return res.status(200).json({ message: 'Comment deleted successfully' });
});

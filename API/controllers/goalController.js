const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const _ = require('lodash');
const Goal = require("../models/userGoal");
const { default: mongoose } = require("mongoose");
const Routine = require("../models/Routine");
const videos = require("../models/videos");
const Nutrition = require("../models/Nutrition");
const Meal = require("../models/Meal");
const moment = require('moment');
const Category = require("../models/Category");

const getLocalDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
};


exports.createGoal = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { weightGoal, nutritionGoals, dailyWaterGoal, dailyStepsGoal } = req.body;
    let existingGoal = await Goal.findOne({ userId });

    if (existingGoal) {
        if (weightGoal) {
            existingGoal.weightGoal = { ...existingGoal.weightGoal, ...weightGoal };
        }
        if (nutritionGoals) {
            existingGoal.nutritionGoals = {
                ...existingGoal.nutritionGoals,
                ...nutritionGoals
            };
        }
        if (dailyWaterGoal !== undefined) {
            existingGoal.dailyWaterGoal = dailyWaterGoal;
        }
        if (dailyStepsGoal !== undefined) {
            existingGoal.dailyStepsGoal = dailyStepsGoal;
        }

        await existingGoal.save();
        return res.status(200).json({
            status: 'success',
            message: 'Goal updated successfully.',
            goal: existingGoal
        });
    }

    weightGoal.startsWeight = weightGoal.currentWeight
    const newGoal = await Goal.create({
        userId,
        weightGoal,
        nutritionGoals,
        dailyWaterGoal,
        dailyStepsGoal
    });

    res.status(201).json({
        status: 'success',
        message: 'Goal created successfully.',
        goal: newGoal
    });
})

exports.getUserGoal = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const goal = await Goal.findOne({ userId })
    res.status(200).json({
        status: "success",
        goal,
        message: "Get user goal successfully.",
    });
})


exports.getMetricData = catchAsync(async (req, res, next) => {
    const { period, metric } = req.query;
    const userId = req.user.id;
    const today = getLocalDate();

    const endDate = new Date();
    let startDate = new Date();

    if (period === 'weekly') {
        startDate.setDate(endDate.getDate() - 7);
    } else if (period === 'monthly') {
        startDate.setMonth(endDate.getMonth() - 1);
    } else {
        return next(new AppError('Invalid period. Use "weekly" or "monthly".', 400));
    }

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    let metricPath = null;

    if (
        [
            "body_fat",
            "muscle",
            "bmi",
            "bmr",
            "bone_mass",
            "body_hydration",
            "metabolic_age",
            "protein",
            "skeletal_muscle",
            "subcutaneous_fat",
            "visceral_fat",
            "muscle_mass"
        ].includes(metric)
    ) {
        metricPath = `body_data.${metric}`;
    } else if (
        [
            "hip",
            "waist",
            "right_arm_flexed",
            "left_arm_flexed",
            "right_arm_unflexed",
            "left_arm_unflexed",
            "chest",
            "thigh",
            "calf"
        ].includes(metric)
    ) {
        metricPath = `body_measurement_parameters.${metric}`;
    } else {
        return next(new AppError('Invalid metric provided.', 400));
    }

    try {
        const data = await Routine.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDateStr, $lte: endDateStr },
                }
            },
            {
                $project: {
                    date: 1,
                    [metric]: `$${metricPath}`,
                }
            },
            {
                $sort: { date: 1 }
            }
        ]);

        const categories = [];
        const seriesData = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            categories.push(dateStr);

            const matchingData = data.find(item => item.date === dateStr);
            seriesData.push(matchingData ? matchingData[metric] || 0 : 0);

            currentDate.setDate(currentDate.getDate() + 1);
        }

        const routine = await Routine.findOne({ date: today, userId });
        let projectionField;
        if (routine && routine.body_data && routine.body_data.hasOwnProperty(metric)) {
            projectionField = `body_data.${metric}`;
        }
        else if (routine && routine.body_measurement_parameters && routine.body_measurement_parameters.hasOwnProperty(metric)) {
            projectionField = `body_measurement_parameters.${metric}`;
        }
        const currentData = await Routine.findOne(
            { date: today, userId },
            { [projectionField]: 1, _id: 0 }
        );
        res.status(200).json({
            status: 'success',
            chart: {
                name: metric,
                data: seriesData,
            },
            categories: categories,
            ...(currentData !== null ? currentData.toObject() : { currentData: "" })
        });
    } catch (err) {
        next(err);
    }
});


exports.getMindnessfull = catchAsync(async (req, res, next) => {
    const videosByCategory = await videos.aggregate([
        {
            $group: {
                _id: { $toObjectId: "$category" }, // Convert `category` string to ObjectId
                videos: {
                    $push: {
                        path: "$path",
                        title: "$title",
                        subcategories: "$subcategories",
                        views: "$views",
                        likes: "$likes",
                        thumbnail: "$thumbnail",
                        audioThumbnail: "$audioThumbnail",
                        createdAt: "$createdAt",
                        filetype:"$filetype"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "categories", // Your categories collection
                localField: "_id",
                foreignField: "_id",
                as: "categoryInfo"
            }
        },
        {
            $unwind: "$categoryInfo" // Convert array to object
        },
        {
            $project: {
                _id: 0,
                category: "$categoryInfo.name", // Replace ID with category name
                videos: {
                    $slice: [
                        { $reverseArray: "$videos" },
                        8
                    ]
                }
            }
        }
    ]);

    if (videosByCategory.length === 0) {
        return res.status(404).json({
            status: "fail",
            message: "No data found"
        });
    }

    const formattedResponse = {};
    videosByCategory.forEach((categoryData) => {
        formattedResponse[categoryData.category] = categoryData.videos;
    });

    return res.status(200).json({
        status: "success",
        data: formattedResponse
    });
});



exports.getMindnessfullByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
        return res.status(404).json({
            status: "fail",
            message: `Category with name "${category}" not found.`,
        });
    }

    const categoryId = categoryDoc._id.toString();

    const videosByCategoryAndSubcategory = await videos.aggregate([
        {
            $match: { category: categoryId },
        },
        {
            $addFields: {
                subcategories: {
                    $convert: {
                        input: "$subcategories",
                        to: "objectId", // Convert subcategories field from string to ObjectId
                        onError: null,
                        onNull: null,
                    },
                },
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $group: {
                _id: "$subcategories",
                videos: {
                    $push: {
                        id: "$_id",
                        path: "$path",
                        title: "$title",
                        views: "$views",
                        likes: "$likes",
                        thumbnail: "$thumbnail",
                        filetype:"$filetype",
                        audioThumbnail: "$audioThumbnail",
                        createdAt: "$createdAt",
                    },
                },
            },
        },
        {
            $lookup: {
                from: "subcategories", // Replace with your subcategories collection name
                localField: "_id",    // Match subcategories ID
                foreignField: "_id",  // Subcategories ID in the collection
                as: "subcategoryInfo",
            },
        },
        {
            $unwind: "$subcategoryInfo", // Unwind the lookup array
        },
        {
            $project: {
                _id: 0,
                subcategory: "$subcategoryInfo.name", // Get the subcategory name
                videos: 1,
            },
        },
    ]);

    if (videosByCategoryAndSubcategory.length === 0) {
        return res.status(404).json({
            status: "fail",
            message: `No videos found for category ${category}`,
        });
    }

    const formattedResponse = {};
    videosByCategoryAndSubcategory.forEach((subcatData) => {
        formattedResponse[subcatData.subcategory] = subcatData.videos;
    });

    return res.status(200).json({
        status: "success",
        data: formattedResponse,
    });
});


exports.getNutritions = async (req, res, next) => {
    try {
        const nutritions = await Nutrition.find({ active: true, userId: req.user.id });
        res.status(200).json({
            status: 'success',
            data: nutritions,
        });
    } catch (error) {
        next(error);
    }
};


exports.getMeals = async (req, res, next) => {
    try {
        const userId = req.user.id
        const mealsByCategory = await Meal.aggregate([
            { $match: { active: true, userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: '$category',
                    meals: { $push: { item: '$item', id: "$_id" } },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const groupedMeals = mealsByCategory.reduce((acc, category) => {
            acc[category._id] = category.meals;
            return acc;
        }, {});

        res.status(200).json({
            status: 'success',
            data: [groupedMeals],
        });
    } catch (error) {
        next(error);
    }
};



exports.get_sleep_records = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = moment().startOf('day');
    const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');
    const sleepRecords = await Routine.find({
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: sevenDaysAgo.format('YYYY-MM-DD'), $lte: today.format('YYYY-MM-DD') }
    }).select('date sleep');

    if (sleepRecords.length === 0) {
        return res.status(404).json({ message: 'No sleep records found for the last 7 days.' });
    }

    const simplifiedData = sleepRecords.map(record => ({
        date: record.date,
        wake_up: record.sleep?.wake_up || 'N/A',
        bed_at: record.sleep?.bed_at || 'N/A'
    }));

    res.status(200).json({
        status: 'success',
        data: simplifiedData,
    });
})

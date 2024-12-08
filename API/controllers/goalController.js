const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const _ = require('lodash');
const Goal = require("../models/userGoal");
const { default: mongoose } = require("mongoose");
const Routine = require("../models/Routine");


exports.createGoal = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const exist = await Goal.findOne({ userId })
    if (exist) {
        const updatedGoal = await Goal.findOneAndUpdate(
            { userId },
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            status: "success",
            message: "Goal updated successfully.",
            goal: updatedGoal
        });
    }
    const goal = await Goal.create({ userId, ...req.body })
    res.status(200).json({
        status: "success",
        message: "Goal created successfully.",
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
        metricPath = `body_data.health_log_parameters.${metric}`;
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
        metricPath = `body_data.body_measurement_parameters.${metric}`;
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

        res.status(200).json({
            status: 'success',
            chart: {
                name: metric,
                data: seriesData,
            },
            categories: categories,
        });
    } catch (err) {
        next(err);
    }
});



const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const _ = require('lodash');
const Goal = require("../models/userGoal");


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
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const Routine = require("../models/Routine");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.register = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body)
    const token = signToken(user._id);

    if (user) {
        return res.json({
            status: 'success',
            message: 'Register Successfull!',
            data: { ...user.toObject(), token }
        })
    }
})


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(user._id);

    if (user) {
        return res.json({
            status: 'success',
            message: 'Login Successfull!',
            data: { ...user.toObject(), token }
        })
    }
})


exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
        const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
        //   await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
            resetURL
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
});


exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.SHA256(req.params.token).toString(crypto.enc.Hex);
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'Password has been reset successfully'
    });

});


exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!(await user.correctPassword(req.body.passwordCurrent))) {
        return next(new AppError('Your current password is wrong.', 401));
    }
    user.password = req.body.password;
    await user.save();
    const token = signToken(user._id);
    if (user) {
        return res.json({
            status: 'success',
            message: 'Password update successfull!',
            data: { ...user.toObject(), token }
        })
    }
});


exports.updateProfile = catchAsync(async (req, res, next) => {
    console.log(req.user)
})



exports.addRoutine = catchAsync(async (req, res, next) => {
    const { ...routineData } = req.body;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    const routine = await Routine.findOneAndUpdate(
        { userId, date: today },
        { $set: routineData },
        { new: true, upsert: true }
    );

    res.status(routine ? 200 : 201).json({
        status: "success",
        message: routine ? "Routine updated" : "Routine created",
        routine
    });
});


exports.getRoutine = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];
    const routine = await Routine.findOne({ userId, date: today });
    res.status(200).json({
        status: "success",
        message:  "Routine get Successfull!",
        routine : routine ? routine : {}
    });
    
});









exports.updateMeal = catchAsync(async (req, res, next) => {
    const mealData = req.body.meal;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    let routine = await Routine.findOne({ userId, date: today });

    if (!routine) {
        routine = await Routine.create({ userId, date: today, meal: mealData });
    } else {
        routine.meal = mealData;
        await routine.save();
    }
    res.status(200).json({
        status: "success",
        message: "Meal updated successfully",
        routine
    });
});



exports.updateWater = catchAsync(async (req, res, next) => {
    const waterData = req.body.water;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    let routine = await Routine.findOne({ userId, date: today }, ('water'));
    if (!routine) {
        routine = await Routine.create({ userId, date: today, water: waterData });
    }
    routine.water = waterData
    await routine.save();

    res.status(200).json({
        status: "success",
        message: "Water section updated successfully",
        routine
    });
});


exports.updateSteps = catchAsync(async (req, res, next) => {
    const stepsData = req.body.steps;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    let routine = await Routine.findOne({ userId, date: today }, ('steps'));

    if (!routine) {
        routine = await Routine.create({ userId, date: today, steps: stepsData });
    }

    routine.steps = stepsData
    await routine.save();
    res.status(200).json({
        status: "success",
        message: "Steps section updated successfully",
        routine
    });
});


exports.updateWorkout = catchAsync(async (req, res, next) => {
    const workoutData = req.body.workout;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    let routine = await Routine.findOne({ userId, date: today }, ('workout'));

    if (!routine) {
        routine = await Routine.create({ userId, date: today, workout: workoutData });
    }

    routine.workout = workoutData
    await routine.save();
    res.status(200).json({
        status: "success",
        message: "Workout section updated successfully",
        routine
    });
});


exports.updateJoinSession = catchAsync(async (req, res, next) => {
    const joinSessionData = req.body.join_session;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];
    let routine = await Routine.findOne({ userId, date: today }, ('join_session'));
    if (!routine) {
        routine = await Routine.create({ userId, date: today, join_session: joinSessionData });
    }
    routine.join_session = joinSessionData
    await routine.save();

    res.status(200).json({
        status: "success",
        message: "Join session updated successfully",
        routine
    });
});


exports.updateNutrition = catchAsync(async (req, res, next) => {
    const nutritionData = req.body.nutrition;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    let routine = await Routine.findOne({ userId, date: today }, ('nutrition'));

    if (!routine) {
        routine = await Routine.create({ userId, date: today, nutrition: nutritionData });
    }

    routine.nutrition = nutritionData;
    await routine.save();
    res.status(200).json({
        status: "success",
        message: "Nutrition section updated successfully",
        routine
    });
});


exports.updateSleep = catchAsync(async (req, res, next) => {
    const sleepData = req.body.sleep;
    const userId = req.user.id;

    const today = new Date().toISOString().split('T')[0];
    let routine = await Routine.findOne({ userId, date: today }, ('sleep'));

    if (!routine) {
        routine = await Routine.create({ userId, date: today, sleep: sleepData });
    }

    routine.sleep = sleepData;
    await routine.save();
    res.status(200).json({
        status: "success",
        message: "Sleep section updated successfully",
        routine
    });
});


exports.updateBodyData = catchAsync(async (req, res, next) => {
    const bodyData = req.body.body_data;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    let routine = await Routine.findOne({ userId, date: today }, ('body_data'));

    if (!routine) {
        routine = await Routine.create({ userId, date: today, body_data: bodyData });
    }
    routine.body_data = bodyData
    await routine.save();
    res.status(200).json({
        status: "success",
        message: "Body data section updated successfully",
        routine
    });
});


const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const Routine = require("../models/Routine");
const { upload } = require("../utils/UploadFiles");
const multer = require("multer");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


exports.register = catchAsync(async (req, res, next) => {

    const { role, email, name, phone, password, ADS_id, address, batchNo, joiningDate } = req.body;

    if (role === 'admin') {
        return next(new AppError('Resistration Not Allowed for Role', 400))
    }
    let newUserData = { email, name, phone, password };
    if (role === 'host') {
        newUserData = {
            ...newUserData,
            role: 'host',
            additionalInfo: {
                ADS_id,
                address,
                batchNo,
                joiningDate,
            }
        };
    } else {
        newUserData = {
            ...newUserData,
            role: 'user',
        };
    }
    const user = await User.create(newUserData);
    const token = signToken(user._id);
    return res.status(201).json({
        status: 'success',
        message: 'Registration successful!',
        data: {
            user: { ...user.toObject(), token }
        }
    });
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email, role }).select('+password');
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
        // const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
        //   await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
            OTP: resetToken
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


exports.verifyOTP = catchAsync(async (req, res, next) => {
    const { otp, email } = req.body;
    const user = await User.findOne({
        email: email,
        passwordResetToken: otp,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('OTP is invalid or has expired', 400));
    }
    res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully',
    });
});


// exports.resendOTP = catchAsync(async (req, res, next) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         return next(new AppError('There is no user with this email address.', 404));
//     }
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });

//     try {
//         res.status(200).json({
//             status: 'success',
//             message: 'OTP resent to email!',
//             OTP: resetToken
//         });
//     } catch (err) {
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save({ validateBeforeSave: false });

//         return next(new AppError('There was an error resending the OTP. Try again later!', 500));
//     }
// });


exports.resetPassword = catchAsync(async (req, res, next) => {
    const { otp, email } = req.body;
    // const hashedToken = crypto.SHA256(req.params.token).toString(crypto.enc.Hex);
    // const hashedToken = req.params.otp
    const user = await User.findOne({
        email: email,
        passwordResetToken: otp,
    });

    // if (!user) {
    //     return next(new AppError('Token is invalid or has expired', 400));
    // }

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


exports.getProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
})


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (!allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


exports.updateProfile = catchAsync(async (req, res, next) => {
    const filteredBody = filterObj(req.body, 'email', 'password', 'role');
    const updatedUser = await User.findById(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
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
        message: "Routine get Successfull!",
        routine: routine ? routine : {}
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


exports.uploadFiles = catchAsync(async (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
        } else if (err) {
            return next(new AppError(err.message, 400))
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new AppError('No files uploaded.', 400))
        }

        const uploadedFiles = Object.entries(req.files).map(([key, files]) => {
            let filepath
            const field = ['image', 'video', 'audiobook', 'pdf']
            if (field.includes(key)) {
                filepath = `http://localhost:7200/uploads/${key}s/${files[0].filename}`
            }
            return {
                field: key,
                fileName: files[0].filename,
                path: filepath,
                mimeType: files[0].mimetype,
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Files uploaded successfully.',
            data: uploadedFiles
        });
    });
});


exports.contact_us = catchAsync(async (req, res, next) => {
    const { name, email, message, phone } = req.body;
    const newContact = new Contact({ name, email, message, phone, });
    await newContact.save();
    return res.status(200).json({
        status: 'success',
        newContact
    });
});

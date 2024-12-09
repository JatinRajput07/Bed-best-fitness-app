const User = require("../models/User");
const Video = require("../models/videos");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const path = require('path');
const Routine = require("../models/Routine");
const { upload, generateThumbnail } = require("../utils/UploadFiles");
const multer = require("multer");
const _ = require('lodash');
const Email = require("../utils/email");
const Recommendation = require("../models/recommendation");
const Asign_User = require("../models/Asign_user");
const Reminder = require("../models/Reminder");
const Goal = require("../models/userGoal");
const UserFiles = require("../models/UserFiles");
const { default: mongoose } = require("mongoose");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


const getLocalDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().split('T')[0];
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
    // const token = signToken(user._id);
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    await new Email(user, resetToken).welcome();

    return res.status(200).json({
        status: 'success',
        message: 'Registration successful! , OTP sent your Email ',
        data: user.email
    });
});


exports.verifyAccount = catchAsync(async (req, res, next) => {
    const { otp, email } = req.body;
    const user = await User.findOne({
        email: email,
        passwordResetToken: otp,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('OTP is invalid or has expired', 400));
    }

    user.isVerified = true;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save()
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully',
        data: { ...user.toObject(), token }
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

    if (!user.isVerified) {
        return next(new AppError('Account is not verified', 401));
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


exports.socialLogin = catchAsync(async (req, res, next) => {
    const { socialId, socialType, email, name, phone, role } = req.body;
    if (!socialId || !socialType) {
        return res.status(400).json({
            status: 'fail',
            message: 'Social ID and socialType are required',
        });
    }

    let user = await User.findOne({ socialId, socialType });
    if (!user) {
        if (!email || !name) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email and name are required for new user creation',
            });
        }
        user = await User.create({
            socialId,
            socialType,
            email,
            name,
            phone,
            isVerified: true,
            role: role || 'user',
        });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        status: 'success',
        message: `${socialType} login successful`,
        data: { ...user.toObject(), token },
    });
});


exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    try {
        // const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
        await new Email(user, resetToken).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'OTP sent to email!',
            // OTP: resetToken
        });
    } catch (err) {
        console.log(err, '===d=d=d==')
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

    user.isVerified = true;
    user.save()

    res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully',
    });
});


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
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
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


exports.deleteAccount = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return next(new AppError("User not found.", 404));
    }

    const collections = [
        { model: Reminder, field: "userId" },
        { model: Routine, field: "userId" },
    ];

    await Promise.all(
        collections.map(async ({ model, field }) => {
            await model.deleteMany({ [field]: userId });
        })
    );

    res.status(200).json({
        status: "success",
        message: "Account and all related data deleted successfully.",
    });
});















exports.addRoutine = catchAsync(async (req, res, next) => {
    const { ...routineData } = req.body;
    const userId = req.user.id;
    const today = getLocalDate()

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
    let userId = req.user.id;

    if (req.user.role !== 'user') {
        userId = req.query.userid
    }
    const today = getLocalDate()
    const query = {
        userId, date: req.query.date ? req.query.date : today
    }

    console.log(query)

    const routine = await Routine.findOne(query);
    res.status(200).json({
        status: "success",
        message: "Routine get Successfull!",
        routine: routine ? routine : {}
    });
});


exports.updateRoutineSection = catchAsync(async (req, res, next) => {
    const section = req.params.section; // Get section type from the route
    const data = req.body[section];    // Get data for the specified section
    const userId = req.user.id;
    const today = getLocalDate();

    if (!data) {
        return next(new AppError(`No data provided for section: ${section}`, 400));
    }

    const validSections = [
        'water',
        'meal',
        'steps',
        'workout',
        'join_session',
        'nutrition',
        'sleep',
        'body_data'
    ];
    if (!validSections.includes(section)) {
        return next(new AppError(`Invalid section: ${section}`, 400));
    }

    let routine = await Routine.findOne({ userId, date: today }, (section));
    if (!routine) {
        routine = await Routine.create({ userId, date: today, [section]: data });
    } else {
        if (section === 'meal') {
            routine.meal = { ...routine.meal, ...data };
        } else if (section === 'body_data') {
            routine.body_data = { ...routine.body_data, ...data };
        } else {
            routine[section] = data;
        }
        await routine.save();
    }

    res.status(200).json({
        status: 'success',
        message: `${section} updated successfully`,
        routine
    });
});


exports.uploadFiles = catchAsync(async (req, res, next) => {

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
        } else if (err) {
            return next(new AppError(err.message, 400));
        }

        if (!req.files || req.files.length === 0) {
            return next(new AppError('No files uploaded.', 400));
        }

        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                const fileType = file.mimetype.split('/')[0];
                const filePath = `http://43.204.2.84:7200/uploads/${fileType}s/${file.filename}`;

                const fileData = {
                    fileName: file.filename,
                    path: filePath,
                    mimeType: file.mimetype
                };

                if (fileType === 'video') {
                    try {
                        const thumbnailPath = await generateThumbnail(file.path);
                        fileData.thumbnail = `http://43.204.2.84:7200/uploads/thumbnails/${path.basename(thumbnailPath)}`;
                    } catch (error) {
                        console.error('Error generating thumbnail:', error);
                    }
                }
                return fileData;
            })
        );

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


exports.createRecommendation = catchAsync(async (req, res, next) => {
    const { videoId, userId } = req.body;

    const existingRecommendation = await Recommendation.findOne({
        user_id: userId,
        video_id: videoId
    });

    if (existingRecommendation) {
        return res.status(200).json({
            status: "success",
        });
    }

    const recommendation = await Recommendation.create(
        { user_id: userId, video_id: videoId }
    );

    return res.status(200).json({
        status: "success",
        recommendation,
    });
});


exports.getUserRecommendations = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const recommendations = await Recommendation.find({ user_id: userId })
        .populate("host_id", "name email")
        .populate("video_id")
        .exec();
    return res.status(200).json({
        status: "success",
        recommendations,
    });
});


exports.deleteRecommendation = catchAsync(async (req, res, next) => {
    const hostId = req.user.id;
    const userRole = req.user.role;
    const { videoId, userId } = req.body

    if (userRole !== "host") {
        return next(new AppError("Only hosts can remove this videos.", 403));
    }

    console.log(hostId, userId)
    const recommendation = await Recommendation.findOne({ host_id: hostId, user_id: userId });
    recommendation.video_id = recommendation.video_id.filter(
        (id) => id.toString() !== videoId.toString()
    );

    if (recommendation.video_id.length === 0) {
        await recommendation.remove();
        return res.status(200).json({
            status: "success",
            message: "Recommendation removed as no videos remain.",
        });
    }

    await recommendation.save();


    return res.status(200).json({
        status: "success",
        message: "Video removed from recommendation.",
        recommendation,
    });
});


exports.Home = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const [videos, recommendationVideosList] = await Promise.all([
        Video.aggregate([
            {
                $group: {
                    _id: "$category",
                    videos: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            path: "$path",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt",
                            category: "$category",
                        }
                    }
                }
            },
            {
                $project: {
                    category: "$_id",
                    videos: { $slice: ["$videos", 10] }
                }
            },

        ]),

        Recommendation.find()
            .populate("video_id", "-__v")
            .exec(),
    ]);

    const groupedVideos = {};

    videos.forEach(category => {
        groupedVideos[category.category] = category.videos;
    });


    const recommendationVideos = recommendationVideosList
        .map(item => item.video_id)
        .flat();

    return res.status(200).json({
        status: "success",
        data: { videos: groupedVideos, recommendationVideos },
    });
});


exports.getVideosByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;
    const { subcategory } = req.query;

    let query = { category };

    const videos = await Video.find(query)
        .select("_id title path createdAt updatedAt category subcategories")
        .exec();

    const videosBySubcategory = {};

    videos.forEach(video => {
        const subcategoryValue = video.subcategories;
        if (!videosBySubcategory[subcategoryValue]) {
            videosBySubcategory[subcategoryValue] = [];
        }
        videosBySubcategory[subcategoryValue].push(video);
    });

    return res.status(200).json({
        status: "success",
        data: { videos: videosBySubcategory },
    });
});


exports.likeVideo = catchAsync(async (req, res, next) => {
    const { videoId } = req.params;
    const userId = req.user.id;

    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(404).json({ status: 'error', message: 'Video not found' });
    }

    if (!video.likes.includes(userId)) {
        video.likes.push(userId);
        video.likesCount = video.likes.length;
        await video.save();
    }

    return res.status(200).json({
        status: 'success',
        data: { video },
    });
});


exports.getPopularVideos = catchAsync(async (req, res, next) => {
    const { category } = req.params;

    const popularVideos = await Video.find({ category })
        .sort({ views: -1, likes: -1 })
        .limit(5)
        .select("_id title path views category")
        .exec();

    return res.status(200).json({
        status: "success",
        data: { popularVideos },
    });
});


exports.get_asign_users = catchAsync(async (req, res, next) => {
    const hostId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== "host") {
        return next(new AppError("Only hosts can get details.", 403));
    }

    const users = await Asign_User.find({ host: hostId }).populate('asign_user')
    if (!users) {
        return next(new AppError("No assigned users found for this host.", 404));
    }
    return res.status(200).json({
        status: "success",
        message: "Assigned users retrieved successfully.",
        data: users,
    });
});


const upsertReminder = async (filter, update) => {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return Reminder.findOneAndUpdate(filter, update, options);
};

exports.addReminder = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const { category, data } = req.body;

    if (!userId || !category || !data) {
        return res.status(400).json({ message: "userId, category, and data are required." });
    }

    const filter = { userId, category };
    const update = { $set: { ...data, userId, category } };

    const reminder = await upsertReminder(filter, update);

    res.status(200).json({ message: "Reminder saved successfully.", reminder });
})

exports.getUserReminders = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const { category } = req.params;
    if (!userId || !category) {
        return res.status(400).json({ message: "userId and category are required." });
    }
    const reminders = await Reminder.find({ userId, category });
    if (reminders.length === 0) {
        return res.status(404).json({ message: "No reminders found for the given user and category." });
    }
    res.status(200).json({ message: "Reminders fetched successfully.", reminders });
});


exports.userUploadFiles = catchAsync(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
        } else if (err) {
            return next(new AppError(err.message, 400));
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new AppError('No files uploaded.', 400));
        }

        const uploadedFiles = await Promise.all(
            Object.entries(req.files).map(async ([key, files]) => {
                let filepath;
                const field = ['image', 'pdf'];
                const fileData = {
                    field: key,
                    fileName: files[0].filename,
                    path: '',
                    mimeType: files[0].mimetype,
                };

                if (field.includes(key)) {
                    filepath = `http://43.204.2.84:7200/uploads/${key}s/${files[0].filename}`;
                    fileData.path = filepath;
                }
                return fileData;
            })
        );

        const data = {
            userId: req.user.id,
            path: uploadedFiles[0].path,
            type: uploadedFiles[0].field
        }
        const uploadfile = await UserFiles.create(data)
        res.status(200).json({
            status: 'success',
            message: 'Files uploaded successfully.',
            data: uploadfile,
        });
    });
});


exports.getUploadFiles = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const uploadfile = await UserFiles.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId) },
        },
        {
            $group: {
                _id: "$type",
                paths: { $push: "$path" },
            },
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                paths: 1,
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        message: 'Files retrieved successfully.',
        data: uploadfile,
    });
});


exports.createBodydata = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        const updatedBodyData = {
            ...existingRoutine.body_data.toObject(),
            ...req.body,
        };

        existingRoutine.body_data = updatedBodyData;
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'Body Data Updated.',
            body_data: updatedBodyData,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        body_data: req.body,
    });

    res.status(201).json({
        status: 'success',
        message: 'Body Data Created.',
        body_data: req.body,
    });
});


exports.getBodydata = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();
    const routine = await Routine.findOne({ userId, date: today }, { body_data: 1 });
    if (!routine) {
        return res.status(404).json({
            status: 'fail',
            message: 'No body data found for today.',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Body Data Retrieved Successfully.',
        body_data: routine.body_data,
    });
});


exports.createOrUpdateBodyMeasurement = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        const updatedBodyMeasurement = {
            ...existingRoutine.body_measurement_parameters.toObject(),
            ...req.body,
        };

        existingRoutine.body_measurement_parameters = updatedBodyMeasurement;
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'Body Measurement Parameters Updated.',
            body_measurement_parameters: updatedBodyMeasurement,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        body_measurement_parameters: req.body,
    });

    res.status(201).json({
        status: 'success',
        message: 'Body Measurement Parameters Created.',
        body_measurement_parameters: req.body,
    });
});



exports.getBodyMeasurement = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const routine = await Routine.findOne({ userId, date: today }, { body_measurement_parameters: 1 });

    if (!routine || !routine.body_measurement_parameters) {
        return res.status(404).json({
            status: 'fail',
            message: 'No Body Measurement Data Found.',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Body Measurement Parameters Retrieved.',
        body_measurement_parameters: routine.body_measurement_parameters,
    });
});


exports.createOrUpdateHealthHabits = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        const updatedHealthHabits = {
            ...existingRoutine.health_habits.toObject(),
            ...req.body,
        };

        existingRoutine.health_habits = updatedHealthHabits;
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'Health Habits Updated.',
            health_habits: updatedHealthHabits,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        health_habits: req.body,
    });

    res.status(201).json({
        status: 'success',
        message: 'Health Habits Created.',
        health_habits: req.body,
    });
});



exports.getHealthHabits = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const routine = await Routine.findOne({ userId, date: today }, { health_habits: 1 });

    if (!routine || !routine.health_habits) {
        return res.status(404).json({
            status: 'fail',
            message: 'No Health Habits Data Found.',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Health Habits Retrieved.',
        health_habits: routine.health_habits,
    });
});


exports.createOrUpdateHygiene = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        const updatedHygiene = {
            ...existingRoutine.hygiene.toObject(),
            ...req.body,
        };

        existingRoutine.hygiene = updatedHygiene;
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'Hygiene Data Updated.',
            hygiene: updatedHygiene,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        hygiene: req.body,
    });

    res.status(201).json({
        status: 'success',
        message: 'Hygiene Data Created.',
        hygiene: req.body,
    });
});



exports.getHygiene = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const routine = await Routine.findOne({ userId, date: today }, { hygiene: 1 });

    if (!routine || !routine.hygiene) {
        return res.status(404).json({
            status: 'fail',
            message: 'No Hygiene Data Found.',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Hygiene Data Retrieved.',
        hygiene: routine.hygiene,
    });
});


exports.createOrUpdateHolisticWellness = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        const updatedHolisticWellness = {
            ...existingRoutine.holistic_wellness.toObject(),
            ...req.body,
        };

        existingRoutine.holistic_wellness = updatedHolisticWellness;
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'Holistic Wellness Data Updated.',
            holistic_wellness: updatedHolisticWellness,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        holistic_wellness: req.body,
    });

    res.status(201).json({
        status: 'success',
        message: 'Holistic Wellness Data Created.',
        holistic_wellness: req.body,
    });
});



exports.getHolisticWellness = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const routine = await Routine.findOne({ userId, date: today }, { holistic_wellness: 1 });

    if (!routine || !routine.holistic_wellness) {
        return res.status(404).json({
            status: 'fail',
            message: 'No Holistic Wellness Data Found.',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Holistic Wellness Data Retrieved.',
        holistic_wellness: routine.holistic_wellness,
    });
});


exports.createOrUpdateWhatNewToday = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        const updatedWhatNewToday = {
            ...existingRoutine.what_new_today.toObject(),
            ...req.body,
        };

        existingRoutine.what_new_today = updatedWhatNewToday;
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'What New Today Data Updated.',
            what_new_today: updatedWhatNewToday,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        what_new_today: req.body,
    });

    res.status(201).json({
        status: 'success',
        message: 'What New Today Data Created.',
        what_new_today: req.body,
    });
});


exports.getWhatNewToday = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const routine = await Routine.findOne({ userId, date: today }, { what_new_today: 1 });

    if (!routine || !routine.what_new_today) {
        return res.status(404).json({
            status: 'fail',
            message: 'No What New Today Data Found.',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'What New Today Data Retrieved.',
        what_new_today: routine.what_new_today,
    });
});





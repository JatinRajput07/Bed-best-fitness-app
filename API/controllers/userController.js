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
const MealReminder = require("../models/MealReminder");
const WaterReminder = require("../models/WaterReminder");
const Banner = require("../models/Banner");
const Notification = require("../models/Notification");
const Meal = require("../models/Meal");
const Nutrition = require("../models/Nutrition");
const Category = require("../models/Category");

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
    const { role, email, name, phone, password, device_token, device_type, ADS_id, address, batchNo, joiningDate } = req.body;
    if (role === 'admin') {
        return next(new AppError('Resistration Not Allowed for Role', 400))
    }
    let newUserData = { email, name, phone, password, device_token, device_type };
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


exports.resendOtp = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new AppError('Email is required to resend OTP.', 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('User not found with this email.', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    await new Email(user, resetToken).welcome();
    return res.status(200).json({
        status: 'success',
        message: 'OTP has been resent to your email!',
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
    const { email, password, role, device_type, device_token } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email, role }).select('+password');
    if (!user || !(await user.correctPassword(password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    if (!user.isVerified) {
        return res.status(400).json({
            status: 'fail',
            message: 'Account is not verified',
            isVerified: false
        })
    }

    const token = signToken(user._id);
    if (device_type, device_token) {
        await User.findByIdAndUpdate(user?._id, { device_type, device_token });
    }
    if (user) {
        return res.json({
            status: 'success',
            message: 'Login Successfull!',
            data: { ...user.toObject(), token }
        })
    }
})


exports.socialLogin = catchAsync(async (req, res, next) => {
    const { socialId, socialType, email, role, device_type, device_token } = req.body;
    if (!socialId || !socialType) {
        return res.status(400).json({
            status: 'fail',
            message: 'Social ID and socialType are required',
        });
    }

    let user = await User.findOne({ socialId, socialType });
    if (!user) {
        if (!email) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email required for new user creation',
            });
        }
        user = await User.create({
            socialId,
            socialType,
            email,
            isVerified: true,
            phone: "0000000000",
            role: role || 'user',
            device_type,
            device_token
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
    const { otp, email, password } = req.body;

    // Validate input
    if (!otp || !email || !password) {
        return next(new AppError("OTP, email, and password are required", 400));
    }

    const user = await User.findOne({
        email: email,
        passwordResetToken: otp,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError("Invalid or expired OTP", 400));
    }

    // Update the password and clear the reset token
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
        status: "success",
        message: "Password has been reset successfully",
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
    const filteredBody = filterObj(req.body, 'email', 'AadharNo', 'ABHA_No', 'password', 'role');
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
    const section = req.params.section;
    const data = req.body[section];
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
    ];

    if (!validSections.includes(section)) {
        return next(new AppError(`Invalid section: ${section}`, 400));
    }

    let routine = await Routine.findOne({ userId, date: today });

    if (!routine) {
        routine = await Routine.create({ userId, date: today, [section]: data });
    } else {
        const updateNestedFields = (target, updates) => {
            for (const key in updates) {
                if (
                    typeof updates[key] === 'object' &&
                    !Array.isArray(updates[key]) &&
                    updates[key] !== null
                ) {
                    if (!target[key] || typeof target[key] !== 'object') {
                        target[key] = {};
                    }
                    updateNestedFields(target[key], updates[key]);
                } else {
                    target[key] = updates[key];
                }
            }
        };

        if (section === 'nutrition') {
            routine.nutrition = routine.nutrition || [];
            data.forEach((item) => {
                const existingItem = routine.nutrition.find(
                    (nutri) => nutri.item === item.item
                );
                if (existingItem) {
                    Object.assign(existingItem, item);
                } else {
                    routine.nutrition.push(item);
                }
            });
        } else {
            routine[section] = routine[section] || {};
            updateNestedFields(routine[section], data);
        }

        await routine.save();
    }

    const responseData = {
        status: 'success',
        message: `${section} updated successfully`,
        routine: routine[section],
    };

    res.status(200).json(responseData);
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
        await Notification.create({
            userId: userId,
            message: `you have been Recommend a New Video`,
            type: "Recommend new Video",
            status: "sent"
        });

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

    const coach = await Asign_User.findOne({ asign_user: userId }, ('host'))
        .populate('host', 'name email')
        .exec();

    const past20Days = Array.from({ length: 20 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    });

    const records = await Routine.find({ userId, date: { $in: past20Days } });
    const userGoal = await Goal.findOne({ userId });

    const calculatePercentage = (achieved, target) => {
        if (!target || target === 0) return 0;
        return Math.min((achieved / target) * 100, 100);
    };

    const today = records.map(record => {
        const date = record.date;
        const weekName = new Date(date).toLocaleString('en-US', { weekday: 'long' });
        const stepsAchieved = parseInt(record?.steps?.steps || 0, 10);
        const stepsTarget = parseInt(userGoal?.dailyStepsGoal || 0, 10);
        const stepsPercentage = calculatePercentage(stepsAchieved, stepsTarget);

        const waterAchieved = parseInt(record?.water?.qty || 0, 10);
        const waterTarget = parseInt(userGoal?.dailyWaterGoal || 0, 10);
        const waterPercentage = calculatePercentage(waterAchieved, waterTarget);

        const nutritionDoses = ['dose1', 'dose2', 'dose3', 'dose4'];
        const nutritionAchieved = nutritionDoses.filter(dose => record.nutrition[dose] === 'take').length;
        const nutritionTarget = nutritionDoses.length;
        const nutritionPercentage = calculatePercentage(nutritionAchieved, nutritionTarget);

        const mealCategories = Object.keys(record.meal || {});
        const mealCompleted = mealCategories.filter(category => record.meal[category]?.status === 'completed').length;
        const mealTarget = mealCategories.length;
        const mealPercentage = calculatePercentage(mealCompleted, mealTarget);
        const isStepsAndWaterComplete = stepsPercentage === 100 && waterPercentage === 100;
        const isAllTasksComplete =
            stepsPercentage === 100 &&
            waterPercentage === 100 &&
            nutritionPercentage === 100 &&
            mealPercentage === 100;

        let emoji = '';
        if (isAllTasksComplete) {
            emoji = '🏆';
        } else if (isStepsAndWaterComplete) {
            emoji = '😊';
        } else if (nutritionPercentage === 100) {
            emoji = '🏋️';
        }
        const taskPercentages = [
            { task: 'steps', percentage: stepsPercentage },
            { task: 'water', percentage: waterPercentage },
            { task: 'nutrition', percentage: nutritionPercentage },
            { task: 'meals', percentage: mealPercentage }
        ];
        const bestTask = taskPercentages.sort((a, b) => b.percentage - a.percentage)[0];

        return {
            date,
            weekName,
            percent: bestTask.percentage.toFixed(2),
            emoji
        };
    });


    const [videos, recommendationVideosList, banners] = await Promise.all([
        Video.aggregate([
            {
                $addFields: {
                    isValidCategory: {
                        $regexMatch: { input: "$category", regex: /^[a-f\d]{24}$/i },
                    },
                    isValidSubcategory: {
                        $regexMatch: { input: "$subcategories", regex: /^[a-f\d]{24}$/i },
                    },
                },
            },
            {
                $match: {
                    isValidCategory: true,
                    isValidSubcategory: true,
                },
            },
            {
                $addFields: {
                    categoryId: { $toObjectId: "$category" },
                    subcategoryId: { $toObjectId: "$subcategories" },
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subcategoryId",
                    foreignField: "_id",
                    as: "subcategoryDetails",
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: "$categoryId",
                    categoryName: { $first: { $arrayElemAt: ["$categoryDetails.name", 0] } },
                    videos: {
                        $push: {
                            id: "$_id",
                            path: "$path",
                            filetype: "$filetype",
                            description: "$description",
                            title: "$title",
                            subcategoryName: {
                                $arrayElemAt: ["$subcategoryDetails.name", 0],
                            },
                            thumbnail: "$thumbnail",
                            audioThumbnail: "$audioThumbnail",
                            views: "$views",
                            likes: "$likes",
                            createdAt: "$createdAt",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$categoryName",
                    videos: {
                        $slice: ["$videos", 8],
                    },
                },
            },
        ]),

        Recommendation.find({ user_id: userId })
            .populate("video_id", { path: 1, title: 1, category: 1, filetype: 1, thumbnail: 1, audioThumbnail: 1 })
            .sort({ recommended_at: -1 })
            .exec(),


        Banner.find({ isActive: true }, ('imageUrl -_id'))
            .sort({ createdAt: -1 })
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
        data: {
            today, host: coach?.host || {}, videos: groupedVideos, recommendationVideos, banners
        },
    });
});

exports.getVideosByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
        return res.status(404).json({
            status: 'fail',
            message: `Category with name "${category}" not found.`,
        });
    }

    const categoryId = categoryDoc._id.toString();

    const videos = await Video.find({ category: categoryId })
        .select("_id title path createdAt updatedAt category subcategories")
        .populate({
            path: "subcategories",
            select: "name",
        })
        .exec();
    const videosBySubcategory = {};

    videos.forEach((video) => {
        video.subcategories.forEach((subcat) => {
            const subcategoryName = subcat.name;

            if (!videosBySubcategory[subcategoryName]) {
                videosBySubcategory[subcategoryName] = [];
            }
            videosBySubcategory[subcategoryName].push({
                id: video._id,
                title: video.title,
                path: video.path,
                createdAt: video.createdAt,
                updatedAt: video.updatedAt,
            });
        });
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

    const users = await Asign_User.find({ host: hostId }).populate('asign_user');
    if (!users || users.length === 0) {
        return next(new AppError("No assigned users found for this host.", 404));
    }
    const assignedUsers = users.flatMap(user => user.asign_user);
    return res.status(200).json({
        status: "success",
        message: "Assigned users retrieved successfully.",
        data: assignedUsers,
    });
});

exports.get_asign_users_details = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const userRole = req.user.role;

    if (userRole !== "host") {
        return next(new AppError("Only hosts can get details.", 403));
    }

    let today = getLocalDate();
    if (req.query.date) {
        today = req.query.date;
    }

    console.log(userId, today, '=====userId , today===');

    const data = await Routine.findOne({ userId, date: today });
    if (!data) {
        return next(new AppError("No Data found for this user.", 404));
    }

    const mealSections = Object.keys(data.meal);
    for (const section of mealSections) {
        const items = data.meal[section]?.items || [];
        if (items.length) {
            const titles = await Meal.find({ _id: { $in: items } }).select('item');
            data.meal[section].items = titles.map(item => item.item);
        }
    }

    const nutritionItems = data.nutrition.map(n => n.item);
    if (nutritionItems.length) {
        const nutritionTitles = await Nutrition.find({ _id: { $in: nutritionItems } }).select('title');
        data.nutrition = data.nutrition.map(n => {
            const titleObj = nutritionTitles.find(t => t._id.equals(n.item));
            return {
                ...n,
                item: titleObj ? titleObj.title : n.item,
            };
        });
    }

    return res.status(200).json({
        status: "success",
        message: "User Details.",
        data,
    });
});



exports.getUserReminders = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const { category } = req.params;


    if (!userId || !category) {
        return res.status(400).json({ message: "userId and category are required." });
    }
    let reminders

    switch (category) {
        case "meal":
            reminders = await MealReminder.find({ userId })
            break;
        case "water":
            reminders = await WaterReminder.find({ userId })
            break;
        default:
            reminders = await Reminder.findOne({ userId, reminder_type: category })
            break;
    }
    res.status(200).json({ message: "Reminders fetched successfully.", reminders });
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
                    mimeType: fileType
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

exports.userUploadFiles = catchAsync(async (req, res, next) => {
    upload(req, res, async (err) => {


        console.log(req.files, req.body, '==========================req.files==============')

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
                const filePath = `http://43.204.2.84:7200/uploads/${fileType == "application" ? "pdf" : fileType}s/${file.filename}`;

                const fileData = {
                    fileName: file.filename,
                    path: filePath,
                    mimeType: fileType == "application" ? "pdf" : fileType
                };
                return fileData;
            })
        );
        const data = {
            userId: req.user.id,
            path: uploadedFiles[0].path,
            type: uploadedFiles[0].mimeType
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


exports.createOrUpdateHealtyHabitRoutine = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const validCategories = {
        health_habits: ["cut_blue_screen_time", "meditation", "go_to_nature", "read_book", "spend_time_family", "loop_with_friends", "spend_time_hobby"],
        hygiene: ["bathing", "hand_wash", "teeth_clean", "nail_cut"],
        holistic_wellness: ["hot_water_wash", "cold_water_wash", "abhyanga", "neti", "palm_rubbing", "foot_massage", "head_massage", "oil_pulling"],
        what_new_today: ["learn_new_language", "learn_sports_skill", "play_music_today", "travel_fun_today"]
    };

    const updateData = {};
    Object.keys(validCategories).forEach(category => {
        const categoryKeys = validCategories[category];
        const categoryData = {};
        categoryKeys.forEach(key => {
            if (req.body[key] !== undefined) {
                categoryData[key] = req.body[key];
            }
        });
        if (Object.keys(categoryData).length > 0) {
            updateData[category] = categoryData;
        }
    });

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'No valid data provided.',
        });
    }

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
        Object.keys(updateData).forEach(category => {
            existingRoutine[category] = {
                ...existingRoutine[category]?.toObject(),
                ...updateData[category],
            };
        });
        await existingRoutine.save();

        return res.status(200).json({
            status: 'success',
            message: 'Routine updated successfully.',
            routine: existingRoutine,
        });
    }

    const newRoutine = await Routine.create({
        userId,
        date: today,
        ...updateData,
    });

    res.status(201).json({
        status: 'success',
        message: 'Routine created successfully.',
        routine: newRoutine,
    });
});


exports.getHealthHabits = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const today = req.query.date || getLocalDate();
    const routine = await Routine.findOne({ userId, date: today });
    if (!routine) {
        return res.status(404).json({
            status: 'fail',
            message: 'No routine data found for the specified date.',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Routine data fetched successfully.',
        routine: {
            health_habits: routine.health_habits || {},
            hygiene: routine.hygiene || {},
            holistic_wellness: routine.holistic_wellness || {},
            what_new_today: routine.what_new_today || {}
        }
    });
});


// exports.createOrUpdateHygiene = catchAsync(async (req, res, next) => {
//     const userId = req.user.id;
//     const today = getLocalDate();

//     const existingRoutine = await Routine.findOne({ userId, date: today });

//     if (existingRoutine) {
//         const updatedHygiene = {
//             ...existingRoutine.hygiene.toObject(),
//             ...req.body,
//         };

//         existingRoutine.hygiene = updatedHygiene;
//         await existingRoutine.save();

//         return res.status(200).json({
//             status: 'success',
//             message: 'Hygiene Data Updated.',
//             hygiene: updatedHygiene,
//         });
//     }

//     const newRoutine = await Routine.create({
//         userId,
//         date: today,
//         hygiene: req.body,
//     });

//     res.status(201).json({
//         status: 'success',
//         message: 'Hygiene Data Created.',
//         hygiene: req.body,
//     });
// });



// exports.getHygiene = catchAsync(async (req, res, next) => {
//     const userId = req.user.id;
//     const today = getLocalDate();

//     const routine = await Routine.findOne({ userId, date: today }, { hygiene: 1 });

//     if (!routine || !routine.hygiene) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'No Hygiene Data Found.',
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         message: 'Hygiene Data Retrieved.',
//         hygiene: routine.hygiene,
//     });
// });


// exports.createOrUpdateHolisticWellness = catchAsync(async (req, res, next) => {
//     const userId = req.user.id;
//     const today = getLocalDate();

//     const existingRoutine = await Routine.findOne({ userId, date: today });

//     if (existingRoutine) {
//         const updatedHolisticWellness = {
//             ...existingRoutine.holistic_wellness.toObject(),
//             ...req.body,
//         };

//         existingRoutine.holistic_wellness = updatedHolisticWellness;
//         await existingRoutine.save();

//         return res.status(200).json({
//             status: 'success',
//             message: 'Holistic Wellness Data Updated.',
//             holistic_wellness: updatedHolisticWellness,
//         });
//     }

//     const newRoutine = await Routine.create({
//         userId,
//         date: today,
//         holistic_wellness: req.body,
//     });

//     res.status(201).json({
//         status: 'success',
//         message: 'Holistic Wellness Data Created.',
//         holistic_wellness: req.body,
//     });
// });



// exports.getHolisticWellness = catchAsync(async (req, res, next) => {
//     const userId = req.user.id;
//     const today = getLocalDate();

//     const routine = await Routine.findOne({ userId, date: today }, { holistic_wellness: 1 });

//     if (!routine || !routine.holistic_wellness) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'No Holistic Wellness Data Found.',
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         message: 'Holistic Wellness Data Retrieved.',
//         holistic_wellness: routine.holistic_wellness,
//     });
// });


// exports.createOrUpdateWhatNewToday = catchAsync(async (req, res, next) => {
//     const userId = req.user.id;
//     const today = getLocalDate();

//     const existingRoutine = await Routine.findOne({ userId, date: today });

//     if (existingRoutine) {
//         const updatedWhatNewToday = {
//             ...existingRoutine.what_new_today.toObject(),
//             ...req.body,
//         };

//         existingRoutine.what_new_today = updatedWhatNewToday;
//         await existingRoutine.save();

//         return res.status(200).json({
//             status: 'success',
//             message: 'What New Today Data Updated.',
//             what_new_today: updatedWhatNewToday,
//         });
//     }

//     const newRoutine = await Routine.create({
//         userId,
//         date: today,
//         what_new_today: req.body,
//     });

//     res.status(201).json({
//         status: 'success',
//         message: 'What New Today Data Created.',
//         what_new_today: req.body,
//     });
// });


// exports.getWhatNewToday = catchAsync(async (req, res, next) => {
//     const userId = req.user.id;
//     const today = getLocalDate();

//     const routine = await Routine.findOne({ userId, date: today }, { what_new_today: 1 });

//     if (!routine || !routine.what_new_today) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'No What New Today Data Found.',
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         message: 'What New Today Data Retrieved.',
//         what_new_today: routine.what_new_today,
//     });
// });




exports.addReminder = catchAsync(async (req, res, next) => {
    const { reminderOn, meals, water, reminderType, reminder_type, onceTime, everydayTime, weeklyTimes } = req.body;
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    if (req.body.hasOwnProperty("meals")) {
        let mealReminder = await MealReminder.findOne({ userId });
        if (mealReminder) {
            mealReminder.reminderOn = reminderOn !== undefined ? reminderOn : mealReminder.reminderOn;
            mealReminder.meals = { ...mealReminder.meals, ...meals };
            await mealReminder.save();
        } else {
            mealReminder = new MealReminder({
                userId,
                reminderOn: reminderOn || false,
                meals: meals || {}
            });
            await mealReminder.save();
        }
    }

    if (req.body.hasOwnProperty("water")) {
        let waterReminder = await WaterReminder.findOne({ userId });
        if (waterReminder) {
            waterReminder.reminderOn = water.reminderOn !== undefined ? water.reminderOn : waterReminder.reminderOn;
            waterReminder.reminderType = water.reminderType || waterReminder.reminderType;
            waterReminder.reminderTime = water.reminderTime || waterReminder.reminderTime;
            waterReminder.startTime = water.startTime || waterReminder.startTime;
            waterReminder.endTime = water.endTime || waterReminder.endTime;
            waterReminder.intervalMinutes = water.intervalMinutes || waterReminder.intervalMinutes;
            waterReminder.customTimes = water.customTimes || waterReminder.customTimes;
            await waterReminder.save();
        } else {
            waterReminder = new WaterReminder({
                userId,
                reminderOn: water.reminderOn || false,
                reminderType: water.reminderType || 'once',
                reminderTime: water.reminderTime || '',
                startTime: water.startTime || '',
                endTime: water.endTime || '',
                intervalMinutes: water.intervalMinutes || 15,
                customTimes: water.customTimes || 7
            });
            await waterReminder.save();
        }
    }

    const validTypes = ['step', 'workout', 'knowledge', 'nutrition'];

    if (validTypes.includes(reminder_type)) {

        console.log(reminder_type, userId, '=====type====')

        let reminder = await Reminder.findOne({ userId, reminder_type });

        console.log(reminder)

        if (reminder) {
            reminder.reminderOn = reminderOn;
            reminder.reminderType = reminderType;
            reminder.onceTime = onceTime;
            reminder.everydayTime = everydayTime;
            reminder.weeklyTimes = weeklyTimes;
            reminder.reminder_type = reminder_type
            reminder = await Reminder.findByIdAndUpdate(reminder._id, reminder, { new: true });
            return res.status(200).json(reminder);
        } else {
            reminder = new Reminder({
                userId,
                reminder_type,
                reminderOn,
                reminderType,
                onceTime,
                everydayTime,
                weeklyTimes
            });

            reminder = await reminder.save();
            return res.status(201).json(reminder);
        }
    }

    res.status(200).json({ status: 'success', message: 'reminder set successfully' });
})


exports.getNotification = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const notification = await Notification.find({ userId })
    res.status(200).json({
        status: 'success',
        message: 'Notification List.',
        notification
    });
})
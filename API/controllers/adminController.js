const { json } = require("express");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const Cms = require("../models/Cms");
const Contact = require("../models/Contact");
const jwt = require('jsonwebtoken')
const Video = require("../models/videos");
const getVideoDuration = require('get-video-duration');
const AppError = require("../utils/AppError");
const Asign_User = require("../models/Asign_user");
const UserFiles = require("../models/UserFiles");
const Goal = require("../models/userGoal");
const Nutrition = require("../models/Nutrition");
const Meal = require("../models/Meal");
const Routine = require("../models/Routine");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Banner = require("../models/Banner");
const { upload, generateThumbnail } = require("../utils/UploadFiles");
const multer = require("multer");
const Recommendation = require("../models/recommendation");
const MealReminder = require("../models/MealReminder");
const WaterReminder = require("../models/WaterReminder");
const Reminder = require("../models/Reminder");
const path = require("path");
const Meeting = require("../models/Meeting");
const { sendPushNotification } = require("../utils/firebaseService");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email, role: { $ne: "user" } });
    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }

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
});


exports.getUserList = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { page = 1, limit = 10, search = '' } = req.query;

    const limitValue = +limit;
    const pageValue = +page;
    const skipValue = (pageValue - 1) * limitValue;
    let query = { role: { $ne: 'admin' } };

    if (req.user.role === 'host') {
        const assignedUsers = await Asign_User.findOne({ host: userId });

        if (assignedUsers) {
            query._id = { $in: assignedUsers.asign_user };
        } else {
            query._id = { $in: [] };
        }
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const users = await User.find(query)

    const totalRecords = await User.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limitValue);

    return res.status(200).json({
        status: 'success',
        users,
        pagination: {
            totalRecords,
            totalPages,
            currentPage: pageValue,
            limit: limitValue
        }
    });
});


exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
    });
});


exports.getUserProfile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const [user, userfiles, userGoal, routine] = await Promise.all([
        User.findById(id),
        UserFiles.find({ userId: id }),
        Goal.findOne({ userId: id }),
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            user,
            userfiles,
            userGoal,
        }
    });
});

exports.getUserRoutine = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { date } = req.query;

    console.log('Getting user routine...');

    if (!date) {
        return next(new AppError('Date is required', 400));
    }

    const userGoal = await Goal.findOne({ userId });
    if (!userGoal) {
        return next(new AppError('User goal not found', 400));
    }

    const userRoutine = await Routine.findOne({ userId, date });
    if (!userRoutine) {
        return next(new AppError('Routine for the given date not found', 400));
    }

    const calculatePercentage = (achieved, target) => {
        if (!target || target === 0) return 0;
        return Math.min((achieved / target) * 100, 100).toFixed(2);
    };

    const stepsAchieved = parseInt(userRoutine.steps?.steps || 0, 10);
    const stepsTarget = parseInt(userGoal.dailyStepsGoal || 0, 10);
    const stepsPercentage = calculatePercentage(stepsAchieved, stepsTarget);

    const waterAchieved = parseInt(userRoutine.water?.qty || 0, 10);
    const waterTarget = parseInt(userGoal.dailyWaterGoal || 0, 10);
    const waterPercentage = calculatePercentage(waterAchieved, waterTarget);

    const nutritionAchieved = userRoutine.nutrition.filter(n => n.status === 'take').length;
    const nutritionTarget = userRoutine.nutrition.length;
    const nutritionPercentage = calculatePercentage(nutritionAchieved, nutritionTarget);

    const currentWeight = userRoutine.body_data?.health_log_parameters?.currentWeight || null;
    const goalWeight = userGoal.weightGoal?.goalWeight || null;
    const weightLeft = goalWeight && currentWeight ? goalWeight - currentWeight : null;
    const weightGoalStatus = currentWeight
        ? `${currentWeight} kg (Goal: ${goalWeight} kg, Remaining: ${weightLeft > 0 ? weightLeft + ' kg' : 'Achieved'})`
        : 'Weight not updated';

    const mealCategories = Object.keys(userRoutine.meal || {});

    // Replace meal item IDs with their titles
    for (const category of mealCategories) {
        const mealData = userRoutine.meal[category];
        const itemIds = mealData?.items || [];
        if (itemIds.length) {
            const items = await Meal.find({ _id: { $in: itemIds } }).select('item');
            userRoutine.meal[category].items = items.map(item => item.item); // Replace IDs with titles
        }
    }

    const nutritionItems = userRoutine.nutrition.map(n => n.item);
    if (nutritionItems.length) {
        const nutritionTitles = await Nutrition.find({ _id: { $in: nutritionItems } }).select('title');
        userRoutine.nutrition = userRoutine.nutrition.map(n => {
            const titleObj = nutritionTitles.find(t => t._id.equals(n.item));
            return {
                ...n,
                item: titleObj ? titleObj.title : n.item, // Replace ID with title
            };
        });
    }

    const mealReport = mealCategories.map(category => {
        const mealData = userRoutine.meal[category];
        return {
            category,
            status: mealData?.status || 'N/A',
            note: mealData?.note || 'No notes',
            image: mealData?.image || '',
            items: mealData?.items || [],
        };
    });

    const response = {
        status: 'success',
        data: {
            goals: {
                weightGoal: weightGoalStatus,
                steps: {
                    achieved: stepsAchieved,
                    target: stepsTarget,
                    percentage: stepsPercentage,
                },
                water: {
                    achieved: waterAchieved,
                    target: waterTarget,
                    percentage: waterPercentage,
                },
                nutrition: {
                    achieved: nutritionAchieved,
                    target: nutritionTarget,
                    percentage: nutritionPercentage,
                },
            },
            routine: {
                date,
                currentWeight,
                meals: mealReport,
            },
        },
    };

    res.status(200).json(response);
});




exports.getCms = catchAsync(async (req, res, next) => {
    const { title } = req.params;
    const cmsContent = await Cms.findOne({ title });
    if (!cmsContent) {
        return res.status(404).json({ message: 'Content not found' });
    }

    return res.status(200).json({
        status: 'success',
        cmsContent
    });
});


exports.updateCms = catchAsync(async (req, res, next) => {
    const { title } = req.params;
    const { content } = req.body;

    const cmsContent = await Cms.findOneAndUpdate(
        { title },
        { content },
        { new: true, runValidators: true }
    );

    return res.status(200).json({
        status: 'success',
        cmsContent
    });
});


exports.getContactUsList = catchAsync(async (req, res, next) => {
    const { page = 1, pageSize = 10, searchQuery = '' } = req.query;
    const query = {
        $or: [
            { name: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
        ],
    };

    const contacts = await Contact.find(query)
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));

    const totalContacts = await Contact.countDocuments(query);

    res.json({ contacts, totalRecords: totalContacts });


    return res.status(200).json({
        status: 'success',
        contacts,
        totalRecords: totalContacts
    });
});


exports.uploadVideos = catchAsync(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
        } else if (err) {
            return next(new AppError(err.message, 400));
        }

        if (!req.files || req.files.length === 0) {
            return next(new AppError('No files uploaded.', 400));
        }
        const { title, category, description, subcategories, filetype, audioThumbnail } = req.body;
        if (!category || !subcategories || subcategories.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Category and subcategory are required.',
            });
        }

        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                const fileType = file.mimetype.split('/')[0];
                const filePath = `http://43.204.2.84:7200/uploads/${fileType}s/${file.filename}`;

                const fileData = {
                    fileName: file.filename,
                    path: filePath,
                    mimeType: fileType,
                };
                if (fileType === 'video') {
                    try {
                        const thumbnailPath = await generateThumbnail(file.path);
                        fileData.thumbnail = `http://43.204.2.84:7200/uploads/thumbnails/${path.basename(thumbnailPath)}`;
                    } catch (error) {
                        console.error('Error generating thumbnail:', error);
                    }
                }

                if (fileType === 'audio') {
                    const thumbnailFile = req.files.find(f => f.fieldname === 'audioThumbnail');
                    if (thumbnailFile) {
                        fileData.audioThumbnail = `http://43.204.2.84:7200/uploads/thumbnails/${path.basename(thumbnailFile.filename)}`;
                    }
                }

                return fileData;
            })
        );

        console.log(uploadedFiles, '[---------------------uploadedFiles=------------------]');

        // Create a video (or audio) entry in the database
        const media = await Video.create({
            title,
            path: uploadedFiles[0].path, // Use the path of the first uploaded file
            category,
            subcategories, // Store the subcategories as received
            description,
            filetype: uploadedFiles[0].mimeType,
            thumbnail: uploadedFiles[0].thumbnail || null, // Store thumbnail if available
            audioThumbnail: uploadedFiles[0].audioThumbnail || null, // Store audio thumbnail if available
        });

        // If media is successfully created, send response
        if (media) {
            return res.status(200).json({
                status: 'success',
                media, // Returning the created media object with its details
            });
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Failed to create media.',
            });
        }
    });
});



exports.getVideos = catchAsync(async (req, res, next) => {
    const videosByCategory = await Video.aggregate([
        {
            $group: {
                _id: "$category",
                videos: {
                    $push: {
                        id: "$_id",
                        path: "$path",
                        filetype: "$filetype",
                        description: "$description",
                        title: "$title",
                        subcategories: "$subcategories",
                        thumbnail: "$thumbnail",
                        audioThumbnail: "$audioThumbnail",
                        views: "$views",
                        likes: "$likes",
                        createdAt: "$createdAt"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                videos: 1
            }
        },
        {
            $addFields: {
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
            status: 'fail',
            message: 'No videos found'
        });
    }
    const formattedResponse = {};
    videosByCategory.forEach((categoryData) => {
        formattedResponse[categoryData.category] = categoryData.videos;
    });

    return res.status(200).json({
        status: 'success',
        data: formattedResponse
    });
});


exports.getVideosByCategoryAndSubcategory = catchAsync(async (req, res, next) => {
    const { category } = req.params;

    const videosByCategoryAndSubcategory = await Video.aggregate([
        {
            $match: { category: category }
        },
        {
            $sort: { createdAt: -1 }
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
                        audioThumbnail: "$audioThumbnail",
                        createdAt: "$createdAt"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                subcategory: "$_id",
                videos: 1
            }
        }
    ]);

    if (videosByCategoryAndSubcategory.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: `No videos found for category ${category}`
        });
    }
    const formattedResponse = {};
    videosByCategoryAndSubcategory.forEach((subcatData) => {
        formattedResponse[subcatData.subcategory] = subcatData.videos;
    });

    return res.status(200).json({
        status: 'success',
        data: formattedResponse
    });
});



exports.dashboard = catchAsync(async (req, res, next) => {
    const [videoCount, userCount, coach, meal, nutrition] = await Promise.all([
        Video.countDocuments().exec(),
        User.countDocuments({ "role": "user" }).exec(),
        User.countDocuments({ "role": "host" }).exec(),
        Meal.countDocuments().exec(),
        Nutrition.countDocuments().exec()
    ]);
    return res.status(200).json({
        status: 'success',
        data: {
            videos: videoCount,
            users: userCount,
            coach: coach,
            meal: meal,
            nutrition: nutrition
        },
    });
});


exports.assign = catchAsync(async (req, res, next) => {
    const { asign_user, host } = req.body;
    if (!asign_user || !host) {
        return res.status(400).json({ message: "Host and users are required." });
    }

    const newAssignment = new Asign_User({ asign_user, host });

    const hostdata = await User.findOne({ _id: host })
    if (newAssignment) {
        await Notification.create({
            userId: asign_user,
            message: `you have been appointed ${hostdata?.name} as coach`,
            type: "Appointed a coach",
            status: "sent"
        });
    }
    await Notification.create({
        userId,
        message,
        type: payload?.notification?.title,
        status: "sent"
    });



    await newAssignment.save();

    res.status(201).json({
        status: 'success',
        data: newAssignment,
    });
});


exports.getHealthOtherdata = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
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


exports.getassign = catchAsync(async (req, res, next) => {
    const assignments = await Asign_User.find()
        .populate('asign_user', 'name email')
        .populate('host', 'name email');

    res.status(200).json({
        status: 'success',
        data: assignments,
    });
});


exports.editassign = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { asign_user, host } = req.body;

    const updatedAssignment = await Asign_User.findByIdAndUpdate(
        id,
        { asign_user, host },
        { new: true }
    );

    if (!updatedAssignment) {
        return res.status(404).json({ message: "Assignment not found." });
    }

    res.status(200).json({
        status: 'success',
        data: updatedAssignment,
    });
});


exports.deleteassign = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const deletedAssignment = await Asign_User.findByIdAndDelete(id);

    if (!deletedAssignment) {
        return res.status(404).json({ message: "Assignment not found." });
    }

    res.status(204).json({
        status: 'success',
        message: "Assignment deleted successfully.",
    });
});


exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, role, permissions, password } = req.body;
    const newUser = new User({ name, email, role, permissions, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
});



exports.updateUser = catchAsync(async (req, res, next) => {
    const { name, email, role, permissions } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role, permissions },
        { new: true }
    );
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
});


exports.createNutrition = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const nutrition = await Nutrition.create({ title, description });

        res.status(201).json({
            status: 'success',
            message: 'Nutrition created successfully!',
            data: nutrition,
        });
    } catch (error) {
        next(error);
    }
};

exports.createMeal = async (req, res, next) => {
    try {
        const { category, item } = req.body;

        const meal = await Meal.create({ category, item });

        res.status(201).json({
            status: 'success',
            message: 'Meal created successfully!',
            data: meal,
        });
    } catch (error) {
        next(error);
    }
};

exports.getNutritions = async (req, res, next) => {
    try {
        const nutritions = await Nutrition.find({ active: true }, ("title description"));
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
        const mealsByCategory = await Meal.aggregate([
            { $match: { active: true } },
            {
                $group: {
                    _id: '$category',
                    meals: { $push: { item: '$item' } },
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
            data: groupedMeals,
        });
    } catch (error) {
        next(error);
    }
};



// Create Category
exports.createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new AppError("Category name is required", 400));
    }

    const category = await Category.create({ name });

    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
    });
});

// Get All Categories with Subcategories
exports.getCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find().populate("subcategories");

    res.status(200).json({
        status: "success",
        data: categories,
    });
});

// Update Category
exports.updateCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new AppError("Category name is required", 400));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: updatedCategory,
    });
});

// Delete Category
exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
    });
});



// Create SubCategory
exports.createSubCategory = catchAsync(async (req, res, next) => {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
        return next(new AppError("Both SubCategory name and Category ID are required", 400));
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    const subCategory = await SubCategory.create({ name, category: categoryId });

    // Link SubCategory to Category
    category.subcategories.push(subCategory._id);
    await category.save();

    res.status(201).json({
        status: "success",
        message: "SubCategory created successfully",
        data: subCategory,
    });
});

// Update SubCategory
exports.updateSubCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new AppError("SubCategory name is required", 400));
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!updatedSubCategory) {
        return next(new AppError("SubCategory not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "SubCategory updated successfully",
        data: updatedSubCategory,
    });
});

// Delete SubCategory
exports.deleteSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
        return next(new AppError("SubCategory not found", 404));
    }

    // Remove SubCategory reference from Category
    await Category.findByIdAndUpdate(subCategory.category, {
        $pull: { subcategories: subCategory._id },
    });

    res.status(200).json({
        status: "success",
        message: "SubCategory deleted successfully",
    });
});


// Banner Create API
exports.createBanner = catchAsync(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
        } else if (err) {
            return next(new AppError(err.message, 400));
        }

        if (!req.files || req.files.length === 0) {
            return next(new AppError('No files uploaded.', 400));
        }

        const { title, description } = req.body;
        const imageUrl = `http://43.204.2.84:7200/uploads/images/${req.files[0].filename}`;
        const newBanner = await Banner.create({
            title,
            description,
            imageUrl,
        });

        res.status(201).json({
            status: 'success',
            message: 'Banner created successfully.',
            data: newBanner,
        });
    });
});

exports.getBanners = catchAsync(async (req, res, next) => {
    const banners = await Banner.find().sort({ createdAt: -1 });
    if (!banners) {
        return next(new AppError('No banners found.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: banners,
    });
});

exports.toggleBannerStatus = catchAsync(async (req, res, next) => {
    const { bannerId } = req.params;

    const banner = await Banner.findById(bannerId);
    if (!banner) {
        return next(new AppError('Banner not found.', 404));
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.status(200).json({
        status: 'success',
        message: `Banner status updated to ${banner.isActive ? 'active' : 'inactive'}.`,
        data: banner,
    });
});


exports.deleteBanner = catchAsync(async (req, res, next) => {
    const { bannerId } = req.params;

    const banner = await Banner.findByIdAndDelete(bannerId);
    if (!banner) {
        return next(new AppError('Banner not found.', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Banner deleted successfully.',
    });
});


exports.getUserRecomenedVideo = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const videos = await Recommendation.find({ user_id }).populate('video_id')
    res.status(201).json({
        status: 'success',
        message: 'successfully.',
        data: videos,
    });
})

exports.getAllUserReminders = catchAsync(async (req, res, next) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const mealReminders = await MealReminder.find({ userId });
        const waterReminders = await WaterReminder.find({ userId });
        const otherReminders = await Reminder.find({ userId });

        const allReminders = [
            ...mealReminders.map(reminder => ({ ...reminder.toObject(), type: 'meal' })),
            ...waterReminders.map(reminder => ({ ...reminder.toObject(), type: 'water' })),
            ...otherReminders.map(reminder => {
                return {
                    ...reminder.toObject(),
                    type: reminder.reminder_type || 'other'
                };
            })
        ];
        res.status(200).json({
            message: "All reminders fetched successfully.",
            reminders: allReminders
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching reminders.",
            error: error.message
        });
    }
});



exports.deleteVideo = catchAsync(async (req, res, next) => {
    const _id = req.params.id
    const videos = await Video.findByIdAndDelete(_id)
    if (videos) {
        await Recommendation.findOneAndDelete({ video_id: _id })
    }
    res.status(201).json({
        status: 'success',
        message: 'successfully.',
        data: videos,
    });
})


exports.getGoalAnalytics = catchAsync(async (req, res, next) => {
    let { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        const currentDate = new Date();
        endDate = currentDate.toISOString().split('T')[0];
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - 20);
        startDate = pastDate.toISOString().split('T')[0];
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const users = await User.find({ role: 'user' }).select('_id');
    const userIds = users.map(user => user._id);

    const routines = await Routine.find({
        userId: { $in: userIds },
        date: { $gte: start.toISOString().split('T')[0], $lte: end.toISOString().split('T')[0] },
    });

    const goals = await Goal.find({ userId: { $in: userIds } });

    const calculatePercentage = (achieved, target) => {
        if (!target || target === 0) return 0;
        return Math.min((achieved / target) * 100, 100);
    };

    const dailySummary = {};

    routines.forEach(routine => {
        const { date, userId } = routine;
        const userGoal = goals.find(goal => goal.userId.equals(userId));
        if (!userGoal) return;

        const day = date;
        if (!dailySummary[day]) {
            dailySummary[day] = {
                totalUsers: 0,
                totalGoalAchieved: 0,
                totalStepsAchieved: 0,
                totalWaterAchieved: 0,
                totalBodyGoalsAchieved: 0, // Add body goal variables as needed
            };
        }

        dailySummary[day].totalUsers++;

        // Steps Calculation
        const stepsAchieved = parseInt(routine.steps?.steps || 0, 10);
        const stepsTarget = parseInt(userGoal.dailyStepsGoal || 0, 10);
        const stepsPercentage = calculatePercentage(stepsAchieved, stepsTarget);
        if (stepsPercentage >= 100) dailySummary[day].totalStepsAchieved++;

        // Water Calculation
        const waterAchieved = parseInt(routine.water?.qty || 0, 10);
        const waterTarget = parseInt(userGoal.dailyWaterGoal || 0, 10);
        const waterPercentage = calculatePercentage(waterAchieved, waterTarget);
        if (waterPercentage >= 100) dailySummary[day].totalWaterAchieved++;

        // Body Goal Calculations (e.g., BMI, Body Fat, etc.)
        const { body_fat, bmi, muscle_mass } = routine.body_data;
        const targetBodyFat = userGoal.targetBodyFat || 20; // Assuming targetBodyFat is part of the user's goal
        const targetBMI = userGoal.targetBMI || 24; // Similarly, a target BMI
        const targetMuscleMass = userGoal.targetMuscleMass || 25; // Similarly, a target muscle mass

        const bodyFatPercentage = calculatePercentage(parseFloat(body_fat), targetBodyFat);
        const bmiPercentage = calculatePercentage(parseFloat(bmi), targetBMI);
        const muscleMassPercentage = calculatePercentage(parseFloat(muscle_mass), targetMuscleMass);

        // You can combine these percentages based on your logic for achieving the goal
        const totalBodyGoalPercentage = (bodyFatPercentage + bmiPercentage + muscleMassPercentage) / 3;

        if (totalBodyGoalPercentage >= 100) dailySummary[day].totalBodyGoalsAchieved++;
    });

    const categories = Object.keys(dailySummary).sort();
    const goalData = categories.map(date => {
        const { totalUsers, totalGoalAchieved, totalStepsAchieved, totalWaterAchieved, totalBodyGoalsAchieved } = dailySummary[date];
        const totalGoalsCompleted = totalStepsAchieved + totalWaterAchieved + totalBodyGoalsAchieved;
        return ((totalGoalsCompleted / (totalUsers * 3)) * 100).toFixed(2);  // Adjust for number of goals (steps, water, body goals)
    });

    res.status(200).json({
        status: 'success',
        data: {
            categories,
            series: [
                { name: 'Achieve Goal', data: goalData },
            ],
        },
    });
});


exports.getuserAndCoachStats = catchAsync(async (req, res, next) => {
    try {

        const currentDate = new Date();
        const endDate = currentDate;
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 19);
        const startDateStr = startDate;

        // console.log(startDateStr, endDate)

        const stats = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDateStr, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
                    totalUsers: { $sum: { $cond: [{ $eq: ["$role", "user"] }, 1, 0] } }, 
                    totalCoaches: { $sum: { $cond: [{ $eq: ["$role", "host"] }, 1, 0] } }, 
                },
            },
            {
                $sort: { _id: 1 }, 
            },
        ]);


        const categories = stats.map(item => {
            const date = new Date(item._id);
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            return `${date.toLocaleDateString('en-US', options)}`;
        });
        const userData = stats.map(item => item.totalUsers);
        const coachData = stats.map(item => item.totalCoaches);
        res.status(200).json({
            status: 'success',
            data: {
                categories,
                series: [
                    { name: 'Users', data: userData },
                    { name: 'Coaches', data: coachData },
                ],
            },
        });
    } catch (error) {
        next(error);
    }
});








exports.createMeeting = catchAsync(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
        } else if (err) {
            return next(new AppError(err.message, 400));
        }

        if (!req.files || req.files.length === 0) {
            return next(new AppError('No files uploaded.', 400));
        }
        const { googleMeetLink, roles, meetingDate, meetingTime, } = req.body;
        if (!googleMeetLink || !roles || roles.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Google Meet link and roles are required.',
            });
        }
        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                const fileType = file.mimetype.split('/')[0];
                const filePath = `http://43.204.2.84:7200/uploads/${fileType}s/${file.filename}`;
                const fileData = {
                    fileName: file.filename,
                    path: filePath,
                    mimeType: fileType,
                };
                return fileData;
            })
        );

        const newMeeting = await Meeting.create({
            googleMeetLink,
            image: uploadedFiles[0].path,
            roles,
            meetingDate,
            meetingTime,
        });

        if (newMeeting) {
            let usersToNotify = [];
            if (roles.includes('user')) {
                const users = await User.find({ role: 'user' });
                usersToNotify = [...usersToNotify, ...users];
            }

            if (roles.includes('coach')) {
                const coaches = await User.find({ role: 'coach' });
                usersToNotify = [...usersToNotify, ...coaches];
            }

            for (const user of usersToNotify) {
                const reminderMessage = `You have a meeting scheduled on ${meetingDate} at ${meetingTime}.`;
                await sendPushNotification(user.device_token, reminderMessage, user._id, "userApp");
            }
            return res.status(200).json({
                status: 'success',
                message: 'Meeting created and notifications sent successfully.',
                meeting: newMeeting,
            });
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Failed to create the meeting.',
            });
        }
    });
});


exports.getMeeting = catchAsync(async (req, res, next) => {
    const meeting = await Meeting.find({}).sort({ createdAt: -1 })
    if (meeting) {
        res.status(200).json({
            status: 'success',
            meeting
        });
    }
});

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
    const { page = 1, limit = 10, search = '' } = req.query;

    const limitValue = +limit;
    const pageValue = +page;
    const skipValue = (pageValue - 1) * limitValue;

    const query = {
        role: { $ne: 'admin' }
    };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const users = await User.find(query)
    // .skip(skipValue).limit(limitValue);

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

    if (!date) {
        return next(new AppError('Date is required', 400));
    }

    const userGoal = await Goal.findOne({ userId });
    if (!userGoal) {
        return next(new AppError('User goal not found', 400));
    }
    const userRoutine = await Routine.findOne({ userId, date });
    if (!userRoutine) {
        return next(new AppError('Routine for the given date not found', 400)); s
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

    const nutritionDoses = ['dose1', 'dose2', 'dose3', 'dose4'];
    const nutritionAchieved = nutritionDoses.filter(dose => userRoutine.nutrition[dose] === 'take').length;
    const nutritionTarget = nutritionDoses.length;
    const nutritionPercentage = calculatePercentage(nutritionAchieved, nutritionTarget);

    const currentWeight = userRoutine.body_data?.health_log_parameters?.currentWeight || null;
    const goalWeight = userGoal.weightGoal?.goalWeight || null;
    const weightGoalStatus = currentWeight
        ? `${currentWeight} kg (Goal: ${goalWeight} kg)`
        : 'Weight not updated';


    const mealCategories = Object.keys(userRoutine.meal || {});
    const mealReport = mealCategories.map(category => {
        const mealData = userRoutine.meal[category];
        return {
            category,
            status: mealData?.status || 'N/A',
            note: mealData?.note || 'No notes',
            items: mealData?.items || {},
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
    const { title, path, category,filetype, description, subcategories } = req.body;
    console.log(title, path, category, subcategories)

    if (!category || !subcategories > 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'Category and subcategory are required',
        });
    }

    const video = await Video.create({
        title,
        path,
        category,
        subcategories: subcategories.value,
        description,
        filetype
        // duration
    });

    if (video) {
        return res.status(200).json({
            status: 'success',
            video
        });
    }
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
                        filetype:"$filetype",
                        description:"$description",
                        title: "$title",
                        subcategories: "$subcategories",
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
    const [videoCount, userCount] = await Promise.all([
        Video.countDocuments().exec(),
        User.countDocuments().exec(),
    ]);

    return res.status(200).json({
        status: 'success',
        data: {
            videos: videoCount,
            users: userCount,
        },
    });
});


exports.assign = catchAsync(async (req, res, next) => {
    const { asign_user, host } = req.body;
    if (!asign_user || !host) {
        return res.status(400).json({ message: "Host and users are required." });
    }

    const newAssignment = new Asign_User({ asign_user, host });
    await newAssignment.save();

    res.status(201).json({
        status: 'success',
        data: newAssignment,
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

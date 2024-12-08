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



exports.getUserProfile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const [user, userfiles, userGoal] = await Promise.all([
        User.findById(id),
        UserFiles.find({ userId: id }),
        Goal.findOne({ userId: id })
    ]);
    res.status(200).json({
        status: 'success',
        data: {
            user,
            userfiles,
            userGoal
        }
    });
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
    const { title, path, category, subcategories } = req.body;
    console.log(title, path, category, subcategories)

    // const duration = await getVideoDuration.getVideoDurationInSeconds(path)

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
                        path: "$path",
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



const { json } = require("express");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const Cms = require("../models/Cms");
const Contact = require("../models/Contact");
const jwt = require('jsonwebtoken')
const Video = require("../models/videos");
const getVideoDuration = require('get-video-duration');
const AppError = require("../utils/AppError");

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
    const user = await User.findOne({ email, role: 'admin' });

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

    const users = await User.find(query).skip(skipValue).limit(limitValue);

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
    const duration = await getVideoDuration.getVideoDurationInSeconds(path)
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
        duration
    });

    if (video) {
        return res.status(200).json({
            status: 'success',
            video
        });
    }
});



exports.getVideos = catchAsync(async (req, res, next) => {
    const { category } = req.params;
    const videos = await Video.aggregate([
        {
            $match: {
                category: category
            }
        }
    ]);

    if (videos.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No videos found for this category'
        });
    }

    return res.status(200).json({
        status: 'success',
        videos
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
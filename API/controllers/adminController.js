const { json } = require("express");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const Cms = require("../models/Cms");
const Contact = require("../models/Contact");

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
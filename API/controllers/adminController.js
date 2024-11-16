const { json } = require("express");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

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

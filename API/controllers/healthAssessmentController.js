const HealthAssessment = require("../models/HealthAssessment");
const catchAsync = require("../utils/catchAsync");



// POST API: Save form data
exports.createFormData = catchAsync(async (req, res, next) => {
    const exist = await HealthAssessment.findOne({
        name: req.body.name,
        mobileNumber: req.body.mobileNumber
    })
    if (exist) {
        res.status(400).json({
            status: 'false',
            message: 'You Already fill this form',
        });
    } else {
        const formData = await HealthAssessment.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Form data saved successfully',
            data: formData,
        });
    }
});

// GET API: Retrieve all form submissions
exports.getFormData = catchAsync(async (req, res, next) => {
    const formData = await HealthAssessment.find();

    res.status(200).json({
        status: 'success',
        message: 'Form data retrieved successfully',
        data: formData,
    });
});

// GET API: Retrieve a single form submission by ID
exports.getFormDataById = catchAsync(async (req, res, next) => {
    const formData = await HealthAssessment.findById(req.params.id);

    if (!formData) {
        return res.status(404).json({
            status: 'fail',
            message: 'No form data found with that ID',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Form data retrieved successfully',
        data: formData,
    });
});
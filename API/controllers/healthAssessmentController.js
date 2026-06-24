const HealthAssessment = require("../models/HealthAssessment");
const Asign_user = require("../models/Asign_user");
const catchAsync = require("../utils/catchAsync");
const { default: mongoose } = require("mongoose");

// POST API: Save form data
exports.createFormData = catchAsync(async (req, res, next) => {
  const exist = await HealthAssessment.findOne({
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
  });

  if (exist) {
    return res.status(400).json({
      status: "false",
      message: "You Already fill this form",
    });
  }

  const formData = await HealthAssessment.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json({
    status: "success",
    message: "Form data saved successfully",
    data: formData,
  });
});

// GET API: Retrieve all form submissions
exports.getFormData = catchAsync(async (req, res, next) => {
  const { role, _id: userId } = req.user;

  // Check sample assessment document
  const sample = await HealthAssessment.findOne().lean();
  console.log("Sample Assessment:", sample);

  let formData = [];

  if (role === "admin") {
    formData = await HealthAssessment.find();
  } else {
    const getCoach = await Asign_user.findOne({
      asign_user: new mongoose.Types.ObjectId(userId),
    });

    console.log(getCoach, "getCoach=====================");
    if (getCoach) {
      formData = await HealthAssessment.find({
        userId: getCoach?.host,
      });
    }
  }

  res.status(200).json({
    status: "success",
    message: "Form data retrieved successfully",
    data: formData,
  });
});

// GET API: Retrieve a single form submission by ID
exports.getFormDataById = catchAsync(async (req, res, next) => {
  const formData = await HealthAssessment.findById(req.params.id);

  if (!formData) {
    return res.status(404).json({
      status: "fail",
      message: "No form data found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Form data retrieved successfully",
    data: formData,
  });
});

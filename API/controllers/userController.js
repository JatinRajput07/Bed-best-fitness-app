const User = require("../models/User");
const Video = require("../models/videos");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
const path = require("path");
const Routine = require("../models/Routine");
const { upload, generateThumbnail } = require("../utils/UploadFiles");
const multer = require("multer");
const _ = require("lodash");
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
const SubCategory = require("../models/SubCategory");
const Highlight = require("../models/Highlight");
const Introduction = require("../models/Introduction");
const Meeting = require("../models/Meeting");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const getLocalDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().split("T")[0];
};

exports.register = catchAsync(async (req, res, next) => {
  const {
    role,
    email,
    name,
    phone,
    password,
    device_token,
    device_type,
    ADS_id,
    address,
    batchNo,
    joiningDate,
  } = req.body;
  if (role === "admin") {
    return next(new AppError("Resistration Not Allowed for Role", 400));
  }

  const existingUser = await User.findOne({ email, role });
  if (existingUser) {
    return next(new AppError(`email already exists`, 400));
  }

  let newUserData = { email, name, phone, password, device_token, device_type };
  if (role === "host") {
    newUserData = {
      ...newUserData,
      role: "host",
      additionalInfo: {
        ADS_id,
        address,
        batchNo,
        joiningDate,
      },
    };
  } else {
    newUserData = {
      ...newUserData,
      role: "user",
    };
  }
  const user = await User.create(newUserData);
  // const token = signToken(user._id);
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  await new Email(user, resetToken).welcome();

  return res.status(200).json({
    status: "success",
    message: "Registration successful! , OTP sent your Email ",
    data: user.email,
  });
});

exports.resendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Email is required to resend OTP.", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found with this email.", 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  await new Email(user, resetToken).welcome();
  return res.status(200).json({
    status: "success",
    message: "OTP has been resent to your email!",
  });
});

exports.verifyAccount = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;
  const user = await User.findOne({
    email: email,
    passwordResetToken: otp,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("OTP is invalid or has expired", 400));
  }

  user.isVerified = true;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "OTP verified successfully",
    data: { ...user.toObject(), token },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, role, device_type, device_token } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email, role }).select("+password");
  console.log(
    user,
    "=======================jatinderkmr0702@gmail.com==========="
  );
  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  if (!user.isVerified) {
    return res.status(400).json({
      status: "fail",
      message: "Account is not verified",
      isVerified: false,
    });
  }

  const token = signToken(user._id);
  if ((device_type, device_token)) {
    await User.findByIdAndUpdate(user?._id, { device_type, device_token });
  }
  if (user) {
    return res.json({
      status: "success",
      message: "Login Successfull!",
      data: { ...user.toObject(), token },
    });
  }
});

exports.socialLogin = catchAsync(async (req, res, next) => {
  const {
    socialId,
    socialType,
    email,
    phone,
    name,
    role,
    device_type,
    device_token,
  } = req.body;
  if (!socialId || !socialType) {
    return res.status(400).json({
      status: "fail",
      message: "Social ID and socialType are required",
    });
  }

  let user = await User.findOne({
    $or: [{ socialId, email }, { email }],
  });
  if (!user) {
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email required for new user creation",
      });
    }
    user = await User.create({
      socialId,
      socialType,
      email,
      isVerified: true,
      phone,
      role: role || "user",
      device_type,
      device_token,
      name,
    });
  } else {
    let updated = false;
    if (device_token && user.device_token !== device_token) {
      user.device_token = device_token;
      updated = true;
    }
    if (device_type && user.device_type !== device_type) {
      user.device_type = device_type;
      updated = true;
    }
    if (updated) await user.save();
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    message: `${socialType} login successful`,
    data: { ...user.toObject(), token },
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  try {
    // const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;
    await new Email(user, resetToken).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "OTP sent to email!",
      // OTP: resetToken
    });
  } catch (err) {
    console.log(err, "===d=d=d==");
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;
  const user = await User.findOne({
    email: email,
    passwordResetToken: otp,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("OTP is invalid or has expired", 400));
  }

  user.isVerified = true;
  user.save();

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully",
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
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent))) {
    return next(new AppError("Your current password is wrong.", 401));
  }
  user.password = req.body.password;
  await user.save();
  const token = signToken(user._id);
  if (user) {
    return res.json({
      status: "success",
      message: "Password update successfull!",
      data: { ...user.toObject(), token },
    });
  }
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const coach = await Asign_User.findOne(
    { asign_user: req.user.id },
    "host imageUrl"
  )
    .populate("host", "name email")
    .exec();
  res.status(200).json({
    status: "success",
    data: {
      user,
      coach,
    },
  });
});

const filterObj = (obj, ...disallowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!disallowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

exports.updateProfile = catchAsync(async (req, res, next) => {
  // Fetch current user
  const currentUser = await User.findById(req.user.id);
  if (!currentUser) return next(new AppError("User not found", 404));

  // Disallowed fields unless empty in DB
  const restrictedFields = ["email", "AadharNo", "ABHA_No", "password", "role"];

  // Filter request body to include only fields that exist in req.body
  let filteredBody = filterObj(req.body, ...restrictedFields);

  // Allow restricted fields if they're EMPTY in DB
  for (const field of restrictedFields) {
    if (req.body[field] && (!currentUser[field] || currentUser[field] === "")) {
      filteredBody[field] = req.body[field];
    }
  }

  // Handle date formatting
  const dateFields = [
    "DOB",
    "OritationDate",
    "FirstReportDate",
    "JourneyStartDate",
    "joiningDate",
  ];

  for (const field of dateFields) {
    if (req.body[field]) {
      const [day, month, year] = req.body[field].split("-");
      const formattedDate = new Date(`${year}-${month}-${day}`);

      if (!isNaN(formattedDate.getTime())) {
        filteredBody[field] = formattedDate;
      } else {
        return next(
          new AppError(
            `Invalid date format for ${field}. Expected format: DD-MM-YYYY.`,
            400
          )
        );
      }
    }
  }
  const additionalFields = ["ADS_id", "address", "batchNo", "joiningDate"];
  for (const field of additionalFields) {
    if (req.body[field]) {
      if (!filteredBody.additionalInfo) filteredBody.additionalInfo = {};

      if (field === "joiningDate") {
        const [day, month, year] = req.body[field].split("-");
        const formattedDate = new Date(`${year}-${month}-${day}`);

        if (!isNaN(formattedDate.getTime())) {
          filteredBody.additionalInfo[field] = formattedDate;
        } else {
          return next(
            new AppError(
              `Invalid date format for additionalInfo.joiningDate. Expected format: DD-MM-YYYY.`,
              400
            )
          );
        }
      } else {
        filteredBody.additionalInfo[field] = req.body[field];
      }
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return next(new AppError("User not found.", 404));
    }

    const collections = [
      { model: Reminder, field: "userId" },
      { model: Routine, field: "userId" },
      { model: Meal, field: "userId" },
      { model: Nutrition, field: "userId" },
      { model: Goal, field: "userId" },
      { model: Notification, field: "userId" },
      { model: Recommendation, field: "user_id" },
      { model: UserFiles, field: "userId" },
    ];

    for (const { model, field } of collections) {
      const filter = { [field]: userId };
      await model.deleteMany(filter).session(session);
    }

    await User.findByIdAndDelete(userId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: "success",
      message: "Account and all related data deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
});

exports.uploadProfilePicture = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    if (!req.files || req.files.length === 0) {
      return next(new AppError("No files uploaded.", 400));
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    // Delete old profile picture if exists
    if (user.profilePicture) {
      try {
        const oldImagePath = `public/uploads/images/${user.profilePicture}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (error) {
        console.error("Error deleting old profile picture:", error);
      }
    }

    const filename = req.files[0].filename;
    const imageUrl = `http://43.204.2.84:7200/uploads/images/${filename}`;

    user.profilePicture = imageUrl;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile picture uploaded successfully",
      data: {
        profilePicture: imageUrl,
      },
    });
  });
});

exports.getProfilePicture = catchAsync(async (req, res, next) => {
  const userId = req.params.userId || req.user.id;
  const user = await User.findById(userId).select("profilePicture");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  if (!user.profilePicture) {
    return next(new AppError("No profile picture found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      profilePicture: user.profilePicture,
    },
  });
});

exports.addRoutine = catchAsync(async (req, res, next) => {
  const { ...routineData } = req.body;
  const userId = req.user.id;
  const today = getLocalDate();

  const routine = await Routine.findOneAndUpdate(
    { userId, date: today },
    { $set: routineData },
    { new: true, upsert: true }
  );

  res.status(routine ? 200 : 201).json({
    status: "success",
    message: routine ? "Routine updated" : "Routine created",
    routine,
  });
});

exports.getRoutine = catchAsync(async (req, res, next) => {
  let userId = req.user.id;

  if (req.user.role !== "user") {
    userId = req.query.userid;
  }
  const today = getLocalDate();
  const query = {
    userId,
    date: req.query.date ? req.query.date : today,
  };

  const routine = await Routine.findOne(query);

  let formattedRoutine = routine ? routine.toObject() : {};

  if (
    formattedRoutine.meal &&
    typeof formattedRoutine.meal === "object" &&
    !Array.isArray(formattedRoutine.meal)
  ) {
    formattedRoutine.meal = Object.entries(formattedRoutine.meal).map(
      ([key, value]) => ({
        type: key,
        ...value,
      })
    );
  }

  console.log(formattedRoutine, "======================formattedRoutine=====================");

  if (
    formattedRoutine.nutrition &&
    typeof formattedRoutine.nutrition === "object" &&
    !Array.isArray(formattedRoutine.nutrition)
  ) {
    formattedRoutine.nutrition = Object.entries(formattedRoutine.nutrition).map(
      ([key, value]) => ({
        type: key,
        ...value,
      })
    );
  }

  res.status(200).json({
    status: "success",
    message: "Routine get Successfull!",
    routine: formattedRoutine,
  });
});

exports.updateRoutineSection = catchAsync(async (req, res, next) => {
  const section = req.params.section;
  const data = req.body[section];
  const userId = req.user.id;
  const today = getLocalDate();

  // Input validation (unchanged)
  if (!data) {
    return next(new AppError(`No data provided for section: ${section}`, 400));
  }

  const validSections = [
    "water",
    "meal",
    "steps",
    "workout",
    "join_session",
    "nutrition",
    "sleep",
  ];

  if (!validSections.includes(section)) {
    return next(new AppError(`Invalid section: ${section}`, 400));
  }

  let routine = await Routine.findOne({ userId, date: today });

  if (!routine) {
    routine = await Routine.create({ userId, date: today, [section]: data });
  } else {
    // SPECIAL HANDLING FOR MEAL SECTION
    if (section === "meal") {
      if (!routine.meal) routine.meal = {};

      // Process each meal type separately
      const mealTypes = ['wake_up_food', 'breakfast', 'morning_snacks', 'lunch', 'evening_snacks', 'dinner'];

      mealTypes.forEach(mealType => {
        if (data[mealType]) {
          // Initialize if not exists
          if (!routine.meal[mealType]) routine.meal[mealType] = {};

          // Handle image separately to preserve existing
          if (data[mealType].image) {
            // Save previous image to history
            if (routine.meal[mealType].image) {
              if (!routine.meal[mealType].imageHistory) {
                routine.meal[mealType].imageHistory = [];
              }
              routine.meal[mealType].imageHistory.push({
                url: routine.meal[mealType].image,
                uploaded_at: routine.meal[mealType].image_uploaded_at || new Date()
              });
            }

            // Update current image and timestamp
            routine.meal[mealType].image = data[mealType].image;
            routine.meal[mealType].image_uploaded_at = new Date();
          }

          // Update other fields normally
          Object.keys(data[mealType]).forEach(key => {
            if (key !== 'image') {
              routine.meal[mealType][key] = data[mealType][key];
            }
          });
        }
      });
    }
    // All other sections (unchanged)
    else {
      const updateNestedFields = (target, updates) => {
        for (const key in updates) {
          // Convert key to lowercase if section is nutrition
          const processedKey = section === 'nutrition' ? key.toLowerCase() : key;
          
          if (
            typeof updates[key] === "object" &&
            !Array.isArray(updates[key]) &&
            updates[key] !== null
          ) {
            if (!target[processedKey] || typeof target[processedKey] !== "object") {
              target[processedKey] = {};
            }
            updateNestedFields(target[processedKey], updates[key]);
          } else {
            target[processedKey] = updates[key];
          }
        }
      };
      
      routine[section] = routine[section] || {};
      updateNestedFields(routine[section], data);
    }

    await routine.save();
  }

  res.status(200).json({
    status: "success",
    message: `${section} updated successfully`,
    routine: routine[section],
  });
});

// Helper function for meal updates
async function handleMealUpdate(routine, data) {
  const mealTypes = [
    'wake_up_food',
    'breakfast',
    'morning_snacks',
    'lunch',
    'evening_snacks',
    'dinner'
  ];

  // Initialize meal object if not exists
  if (!routine.meal) {
    routine.meal = {};
  }

  // Process each meal type in the update data
  for (const mealType of mealTypes) {
    if (data[mealType]) {
      // Initialize meal type if not exists
      if (!routine.meal[mealType]) {
        routine.meal[mealType] = {};
      }

      // Handle image preservation
      if (data[mealType].image && routine.meal[mealType].image) {
        if (!routine.meal[mealType].imageHistory) {
          routine.meal[mealType].imageHistory = [];
        }
        routine.meal[mealType].imageHistory.push({
          url: routine.meal[mealType].image,
          uploaded_at: routine.meal[mealType].image_uploaded_at || new Date()
        });
      }

      // Update only the changed fields
      for (const field in data[mealType]) {
        if (field === 'image') {
          routine.meal[mealType][field] = data[mealType][field];
          routine.meal[mealType].image_uploaded_at = new Date();
        } else {
          routine.meal[mealType][field] = data[mealType][field];
        }
      }
    }
  }
}

exports.uploadFiles = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    if (!req.files || req.files.length === 0) {
      return next(new AppError("No files uploaded.", 400));
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileType = file.mimetype.split("/")[0];
        const filePath = `http://43.204.2.84:7200/uploads/${fileType}s/${file.filename}`;

        const fileData = {
          fileName: file.filename,
          path: filePath,
          mimeType: file.mimetype,
        };

        if (fileType === "video") {
          try {
            const thumbnailPath = await generateThumbnail(file.path);
            fileData.thumbnail = `http://43.204.2.84:7200/uploads/thumbnails/${path.basename(
              thumbnailPath
            )}`;
          } catch (error) {
            console.error("Error generating thumbnail:", error);
          }
        }
        return fileData;
      })
    );

    res.status(200).json({
      status: "success",
      message: "Files uploaded successfully.",
      data: uploadedFiles,
    });
  });
});

exports.contact_us = catchAsync(async (req, res, next) => {
  const { name, email, message, phone } = req.body;
  const newContact = new Contact({ name, email, message, phone });
  await newContact.save();
  return res.status(200).json({
    status: "success",
    newContact,
  });
});

exports.createRecommendation = catchAsync(async (req, res, next) => {
  const { videoId, userId } = req.body;

  const existingRecommendation = await Recommendation.findOne({
    user_id: userId,
    video_id: videoId,
  });

  if (existingRecommendation) {
    await Notification.create({
      userId: userId,
      message: `you have been Recommend a New Video`,
      type: "Recommend new Video",
      status: "sent",
    });

    return res.status(200).json({
      status: "success",
    });
  }

  const recommendation = await Recommendation.create({
    user_id: userId,
    video_id: videoId,
  });

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
  const { videoId, userId } = req.body;

  if (userRole !== "host") {
    return next(new AppError("Only hosts can remove this videos.", 403));
  }

  console.log(hostId, userId);
  const recommendation = await Recommendation.findOne({
    host_id: hostId,
    user_id: userId,
  });
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

  const coach = await Asign_User.findOne({ asign_user: userId },"host imageUrl").populate("host", "name email").exec();

  const past20Days = Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  });

  const records = await Routine.find({ userId, date: { $in: past20Days } });
  const userGoal = await Goal.findOne({ userId });

  const calculatePercentage = (achieved, target) => {
    if (!target || target === 0) return 0;
    return Math.min((achieved / target) * 100, 100);
  };

  const today = records.map((record) => {
    const date = record.date;
    const weekName = new Date(date).toLocaleString("en-US", {
      weekday: "long",
    });
    const stepsAchieved = parseInt(record?.steps?.steps || 0, 10);
    const stepsTarget = parseInt(userGoal?.dailyStepsGoal || 0, 10);
    const stepsPercentage = calculatePercentage(stepsAchieved, stepsTarget);

    const waterAchieved = parseInt(record?.water?.qty || 0, 10);
    const waterTarget = parseInt(userGoal?.dailyWaterGoal || 0, 10);
    const waterPercentage = calculatePercentage(waterAchieved, waterTarget);

    const nutritionDoses = ["dose1", "dose2", "dose3", "dose4"];
    const nutritionAchieved = nutritionDoses.filter(
      (dose) => record.nutrition[dose] === "take"
    ).length;
    const nutritionTarget = nutritionDoses.length;
    const nutritionPercentage = calculatePercentage(
      nutritionAchieved,
      nutritionTarget
    );

    const mealCategories = Object.keys(record.meal || {});
    const mealCompleted = mealCategories.filter(
      (category) => record.meal[category]?.status === "completed"
    ).length;
    const mealTarget = mealCategories.length;
    const mealPercentage = calculatePercentage(mealCompleted, mealTarget);
    const isStepsAndWaterComplete =
      stepsPercentage === 100 && waterPercentage === 100;
    const isAllTasksComplete =
      stepsPercentage === 100 &&
      waterPercentage === 100 &&
      nutritionPercentage === 100 &&
      mealPercentage === 100;

    let emoji = "";
    if (isAllTasksComplete) {
      emoji = "🏆";
    } else if (isStepsAndWaterComplete) {
      emoji = "😊";
    } else if (nutritionPercentage === 100) {
      emoji = "🏋️";
    }
    const taskPercentages = [
      { task: "steps", percentage: stepsPercentage },
      { task: "water", percentage: waterPercentage },
      { task: "nutrition", percentage: nutritionPercentage },
      { task: "meals", percentage: mealPercentage },
    ];
    const bestTask = taskPercentages.sort(
      (a, b) => b.percentage - a.percentage
    )[0];

    return {
      date,
      weekName,
      percent: bestTask.percentage.toFixed(2),
      emoji,
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
          categoryName: {
            $first: { $arrayElemAt: ["$categoryDetails.name", 0] },
          },
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
      .populate("video_id", {
        path: 1,
        title: 1,
        category: 1,
        filetype: 1,
        thumbnail: 1,
        audioThumbnail: 1,
      })
      .sort({ recommended_at: -1 })
      .exec(),

    Banner.find({ isActive: true }, "imageUrl link -_id")
      .sort({ createdAt: -1 })
      .exec(),
  ]);

  const groupedVideos = {};

  videos.forEach((category) => {
    groupedVideos[category.category] = category.videos;
  });

  const recommendationVideos = recommendationVideosList
    .map((item) => item.video_id)
    .flat();

  const highlights = await Highlight.find({}, "url").sort({ createdAt: -1 });

  return res.status(200).json({
    status: "success",
    data: {
      today,
      host:
        { ...coach?.host?.toObject(), imageUrl: coach?.imageUrl || "" } || {},
      videos: groupedVideos,
      recommendationVideos,
      banners,
      highlights,
    },
  });
});

exports.getVideosByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;

  const categoryDoc = await Category.findOne({ name: category });
  if (!categoryDoc) {
    return res.status(404).json({
      status: "fail",
      message: `Category with name "${category}" not found.`,
    });
  }

  const categoryId = categoryDoc._id.toString();

  const videos = await Video.find({ category: categoryId }).exec();

  const subcategoryNames = await SubCategory.find({
    _id: { $in: videos.map((video) => video.subcategories) },
  }).select("_id name");

  const subcategoryMap = subcategoryNames.reduce((acc, subcat) => {
    acc[subcat._id] = subcat.name;
    return acc;
  }, {});

  const videosBySubcategory = {};

  videos.forEach((video) => {
    const subcategoryId = video.subcategories;
    const subcategoryName = subcategoryMap[subcategoryId];

    if (subcategoryName) {
      if (!videosBySubcategory[subcategoryName]) {
        videosBySubcategory[subcategoryName] = [];
      }
      videosBySubcategory[subcategoryName].push({
        id: video._id,
        title: video.title,
        path: video.path,
        thumbnail: video.thumbnail,
        audioThumbnail: video.audioThumbnail,
        fileType: video.filetype,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      });
    }
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
    return res
      .status(404)
      .json({ status: "error", message: "Video not found" });
  }

  if (!video.likes.includes(userId)) {
    video.likes.push(userId);
    video.likesCount = video.likes.length;
    await video.save();
  }

  return res.status(200).json({
    status: "success",
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

  const users = await Asign_User.find({ host: hostId }).populate("asign_user");
  if (!users || users.length === 0) {
    return next(new AppError("No assigned users found for this host.", 404));
  }
  const assignedUsers = users.flatMap((user) => user.asign_user);
  return res.status(200).json({
    status: "success",
    message: "Assigned users retrieved successfully.",
    data: assignedUsers,
  });
});

exports.get_asign_users_details = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const userRole = req.user.role;

  // Get the date from query or use today's date
  let today = getLocalDate();
  if (req.query.date) {
    today = req.query.date;
  }

  // Fetch routine data for the user and date
  let data = await Routine.findOne({ userId, date: today })
    .populate("nutrition.morning.items", "name description quantity -_id ")
    .populate("nutrition.lunch.items", "name description quantity -_id")
    .populate("nutrition.evening.items", "name description quantity -_id")
    .populate("nutrition.dinner.items", "name description quantity -_id");

  // If no data found, return error
  if (!data) {
    return next(new AppError("No Data found for this user.", 404));
  }

  // Dynamically populate nutrition items with space-containing keys
  const optionalNutritionKeys = [
    "pre breakfast",
    "post breakfast",
    "pre lunch",
    "post lunch",
    "pre dinner",
    "post dinner",
    "before sleep at night",
  ];
  for (const key of optionalNutritionKeys) {
    if (data.nutrition?.[key]?.items?.length) {
      await data.populate({
        path: `nutrition.${key}.items`,
        select: "name description quantity -_id",
        strictPopulate: false,
      });
    }
  }

  // Convert Mongoose document to plain JavaScript object
  data = data.toObject();

  // Populate meal items manually
  const mealSections = Object.keys(data.meal || {});
  for (const section of mealSections) {
    const items = data?.meal[section]?.items || [];
    if (items.length) {
      const mealTitles = await Meal.find({ _id: { $in: items } }).select("item");
      data.meal[section].items = mealTitles.map((item) => item.item);
    }
  }

  // Transform nutrition items into plain values
  const nutritionSections = Object.keys(data.nutrition || {});
  for (const section of nutritionSections) {
    const items = data?.nutrition[section]?.items || [];
    if (items.length) {
      const mealTitles = await Nutrition.find({ _id: { $in: items } }).select(
        "name description quantity -_id"
      );
      data.nutrition[section].items = mealTitles.map((item) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
      }));
    }
  }

  // Send response
  return res.status(200).json({
    status: "success",
    message: "User Details.",
    data,
  });
});

exports.getUserReminders = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { category } = req.params;

  if (!userId || !category) {
    return res
      .status(400)
      .json({ message: "userId and category are required." });
  }
  let reminders;

  switch (category) {
    case "meal":
      reminders = await MealReminder.find({ userId });
      break;
    case "water":
      reminders = await WaterReminder.find({ userId });
      break;
    default:
      reminders = await Reminder.findOne({ userId, reminder_type: category });
      break;
  }
  res
    .status(200)
    .json({ message: "Reminders fetched successfully.", reminders });
});

exports.uploadFiles = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    if (!req.files || req.files.length === 0) {
      return next(new AppError("No files uploaded.", 400));
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileType = file.mimetype.split("/")[0];
        const filePath = `http://43.204.2.84:7200/uploads/${fileType}s/${file.filename}`;

        const fileData = {
          fileName: file.filename,
          path: filePath,
          mimeType: fileType,
        };

        if (fileType === "video") {
          try {
            const thumbnailPath = await generateThumbnail(file.path);
            fileData.thumbnail = `http://43.204.2.84:7200/uploads/thumbnails/${path.basename(
              thumbnailPath
            )}`;
          } catch (error) {
            console.error("Error generating thumbnail:", error);
          }
        }
        return fileData;
      })
    );

    res.status(200).json({
      status: "success",
      message: "Files uploaded successfully.",
      data: uploadedFiles,
    });
  });
});

exports.userUploadFiles = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    console.log(
      req.files,
      req.body,
      "==========================req.files=============="
    );

    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    if (!req.files || req.files.length === 0) {
      return next(new AppError("No files uploaded.", 400));
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileType = file.mimetype.split("/")[0];
        const filePath = `http://43.204.2.84:7200/uploads/${
          fileType == "application" ? "pdf" : fileType
        }s/${file.filename}`;

        const fileData = {
          fileName: file.filename,
          path: filePath,
          mimeType: fileType == "application" ? "pdf" : fileType,
        };
        
        // Create a record for each file
        const uploadfile = await UserFiles.create({
          userId: req.user.id,
          path: fileData.path,
          type: fileData.mimeType
        });
        
        return uploadfile;
      })
    );
    
    res.status(200).json({
      status: "success",
      message: "Files uploaded successfully.",
      data: uploadedFiles, // Return all uploaded files data
    });
  });
});

exports.deleteUserUploadFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await UserFiles.findByIdAndDelete(id);
  }
  res.status(200).json({
    status: "success",
    message: "Blood Report File Deleted!.",
  });
});

exports.getUploadFiles = catchAsync(async (req, res, next) => {
  const userId = req.user.id || req.query.userId;

  const uploadfile = await UserFiles.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId), type: "pdf" },
    },
    {
      $project: {
        _id: 1,
        path: 1,
        type: 1,
        createdAt: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: "Files retrieved successfully.",
    data: uploadfile,
  });
});


exports.getUserImages = catchAsync(async (req, res, next) => {
  const userId = req.user.id || req.query.userId;
  const uploadfile = await UserFiles.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId), type: "image" },
    },
    {
      $project: {
        _id: 1,
        path: 1,
        type: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    }
  ]);

  res.status(200).json({
    status: "success",
    message: "Files retrieved successfully.",
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
      status: "success",
      message: "Body Data Updated.",
      body_data: updatedBodyData,
    });
  }

  const newRoutine = await Routine.create({
    userId,
    date: today,
    body_data: req.body,
  });

  res.status(201).json({
    status: "success",
    message: "Body Data Created.",
    body_data: req.body,
  });
});

exports.getBodydata = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const today = getLocalDate();
  const routine = await Routine.findOne(
    { userId, date: today },
    { body_data: 1 }
  );
  if (!routine) {
    return res.status(404).json({
      status: "fail",
      message: "No body data found for today.",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Body Data Retrieved Successfully.",
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
      status: "success",
      message: "Body Measurement Parameters Updated.",
      body_measurement_parameters: updatedBodyMeasurement,
    });
  }

  const newRoutine = await Routine.create({
    userId,
    date: today,
    body_measurement_parameters: req.body,
  });

  res.status(201).json({
    status: "success",
    message: "Body Measurement Parameters Created.",
    body_measurement_parameters: req.body,
  });
});

exports.getBodyMeasurement = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const today = getLocalDate();

  const routine = await Routine.findOne(
    { userId, date: today },
    { body_measurement_parameters: 1 }
  );

  if (!routine || !routine.body_measurement_parameters) {
    return res.status(404).json({
      status: "fail",
      message: "No Body Measurement Data Found.",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Body Measurement Parameters Retrieved.",
    body_measurement_parameters: routine.body_measurement_parameters,
  });
});

exports.createOrUpdateHealtyHabitRoutine = catchAsync(
  async (req, res, next) => {
    const userId = req.user.id;
    const today = getLocalDate();

    const validCategories = {
      health_habits: [
        "cut_blue_screen_time",
        "meditation",
        "go_to_nature",
        "read_book",
        "spend_time_family",
        "loop_with_friends",
        "spend_time_hobby",
      ],
      hygiene: ["bathing", "hand_wash", "teeth_clean", "nail_cut"],
      holistic_wellness: [
        "hot_water_wash",
        "cold_water_wash",
        "abhyanga",
        "neti",
        "palm_rubbing",
        "foot_massage",
        "head_massage",
        "oil_pulling",
      ],
      what_new_today: [
        "learn_new_language",
        "learn_sports_skill",
        "play_music_today",
        "travel_fun_today",
      ],
    };

    // Only update fields that are provided in request body
    const updateData = {};
    Object.keys(validCategories).forEach((category) => {
      const categoryKeys = validCategories[category];
      const providedKeys = Object.keys(req.body).filter((key) =>
        categoryKeys.includes(key)
      );

      if (providedKeys.length > 0) {
        const categoryData = {};
        providedKeys.forEach((key) => {
          categoryData[key] = req.body[key];
        });
        updateData[category] = categoryData;
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No valid data provided.",
      });
    }

    const existingRoutine = await Routine.findOne({ userId, date: today });

    if (existingRoutine) {
      Object.keys(updateData).forEach((category) => {
        existingRoutine[category] = {
          ...existingRoutine[category]?.toObject(),
          ...updateData[category],
        };
      });
      await existingRoutine.save();

      return res.status(200).json({
        status: "success",
        message: "Routine updated successfully.",
        routine: existingRoutine,
      });
    }

    const newRoutine = await Routine.create({
      userId,
      date: today,
      ...updateData,
    });

    res.status(201).json({
      status: "success",
      message: "Routine created successfully.",
      routine: newRoutine,
    });
  }
);

exports.getHealthHabits = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const today = req.query.date || getLocalDate();
  const routine = await Routine.findOne({ userId, date: today });
  if (!routine) {
    return res.status(404).json({
      status: "fail",
      message: "No routine data found for the specified date.",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Routine data fetched successfully.",
    routine: {
      health_habits: routine.health_habits || {},
      hygiene: routine.hygiene || {},
      holistic_wellness: routine.holistic_wellness || {},
      what_new_today: routine.what_new_today || {},
    },
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
  const {
    reminderOn,
    meals,
    water,
    reminderType,
    reminder_type,
    onceTime,
    everydayTime,
    weeklyTimes,
  } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (req.body.hasOwnProperty("meals")) {
    let mealReminder = await MealReminder.findOne({ userId });
    if (mealReminder) {
      mealReminder.reminderOn =
        reminderOn !== undefined ? reminderOn : mealReminder.reminderOn;
      mealReminder.meals = { ...mealReminder.meals, ...meals };
      mealReminder.everyday = req?.body?.everyday;
      mealReminder.everyTime = req?.body?.everyTime;
      await mealReminder.save();
    } else {
      mealReminder = new MealReminder({
        userId,
        everyday: req?.body?.everyday,
        everyTime: req?.body?.everyTime,
        reminderOn: reminderOn || false,
        meals: meals || {},
      });
      await mealReminder.save();
    }
  }

  if (req.body.hasOwnProperty("water")) {
    let waterReminder = await WaterReminder.findOne({ userId });
    if (waterReminder) {
      waterReminder.reminderOn =
        water.reminderOn !== undefined
          ? water.reminderOn
          : waterReminder.reminderOn;
      waterReminder.reminderType =
        water.reminderType || waterReminder.reminderType;
      waterReminder.reminderTime =
        water.reminderTime || waterReminder.reminderTime;
      waterReminder.startTime = water.startTime || waterReminder.startTime;
      waterReminder.endTime = water.endTime || waterReminder.endTime;
      waterReminder.intervalMinutes =
        water.intervalMinutes || waterReminder.intervalMinutes;
      waterReminder.customTimes =
        water.customTimes || waterReminder.customTimes;
      await waterReminder.save();
    } else {
      waterReminder = new WaterReminder({
        userId,
        reminderOn: water.reminderOn || false,
        reminderType: water.reminderType || "once",
        reminderTime: water.reminderTime || "",
        startTime: water.startTime || "",
        endTime: water.endTime || "",
        intervalMinutes: water.intervalMinutes || 15,
        customTimes: water.customTimes || 7,
      });
      await waterReminder.save();
    }
  }

  const validTypes = ["step", "workout", "knowledge", "nutrition"];

  if (validTypes.includes(reminder_type)) {
    console.log(reminder_type, userId, "=====type====");

    let reminder = await Reminder.findOne({ userId, reminder_type });

    console.log(reminder);

    if (reminder) {
      reminder.reminderOn = reminderOn;
      reminder.reminderType = reminderType;
      reminder.onceTime = onceTime;
      reminder.everydayTime = everydayTime;
      reminder.weeklyTimes = weeklyTimes;
      reminder.reminder_type = reminder_type;
      reminder = await Reminder.findByIdAndUpdate(reminder._id, reminder, {
        new: true,
      });
      return res.status(200).json(reminder);
    } else {
      reminder = new Reminder({
        userId,
        reminder_type,
        reminderOn,
        reminderType,
        onceTime,
        everydayTime,
        weeklyTimes,
      });

      reminder = await reminder.save();
      return res.status(201).json(reminder);
    }
  }

  res
    .status(200)
    .json({ status: "success", message: "reminder set successfully" });
});

exports.getNotification = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const notification = await Notification.find({ userId });
  res.status(200).json({
    status: "success",
    message: "Notification List.",
    notification,
  });
});

exports.getIntro = catchAsync(async (req, res, next) => {
  const intro = await Introduction.find({ isActive: true }, "imageUrl");
  res.status(200).json({
    status: "success",
    message: "Successfull",
    intro,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // user.socialId = "";
  // user.socialType = "";
  (user.device_token = ""), (user.device_type = ""), await user.save();

  res.status(200).json({
    status: "success",
    message: "Logout Successful",
  });
});

exports.getMeetings = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.find();
  res.status(200).json({
    status: "success",
    message: "Successfull",
    meeting,
  });
});

exports.getMeetingsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  if (!category) {
    return next(new AppError("Category is required.", 400));
  }
  const meetings = await Meeting.find({ category });
  if (meetings.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No meetings found for the specified category.",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Meetings fetched successfully.",
    meetings,
  });
});


exports.getVideoRecommendations = catchAsync(async (req, res, next) => {
  const recommendations = await Recommendation.find()
    .populate("user_id", "name email profilePicture")
    .populate("video_id")
    .exec();
  const validRecommendations = recommendations.filter(rec => rec.video_id !== null);

  return res.status(200).json({
    status: "success",
    recommendations: validRecommendations,
  });
});

exports.deleteVideoRecommendation = catchAsync(async (req, res, next) => {
  const { recommendationId } = req.params;
  if (!recommendationId) {
    return next(new AppError("Recommendation ID is required", 400));
  }
  const recommendation = await Recommendation.findByIdAndDelete(recommendationId);

  if (!recommendation) {
    return next(new AppError("Recommendation not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Video recommendation deleted successfully"
  });
});
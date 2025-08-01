const { json } = require("express");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const Cms = require("../models/Cms");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");
const Video = require("../models/videos");
const getVideoDuration = require("get-video-duration");
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
const { default: mongoose } = require("mongoose");
const Notification = require("../models/Notification");
const Highlight = require("../models/Highlight");
const Introduction = require("../models/Introduction");
const Inventory = require("../models/Inventory");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email, role: { $ne: "user" } });
  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  if (user) {
    return res.json({
      status: "success",
      message: "Login Successfull!",
      data: { ...user.toObject(), token },
    });
  }
});

exports.getUserList = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { page = 1, search = "", role = "", limit } = req.query;

  const limitValue = parseInt(limit, 10);
  const pageValue = parseInt(page, 10);
  const skipValue = (pageValue - 1) * limitValue;

  let query = { role: { $ne: "admin" } };

  if (req.user.role === "host") {
    const assignedUsers = await Asign_User.find({ host: userId });

    if (assignedUsers.length > 0) {
      const assignedUserIds = assignedUsers
        .map((user) => user.asign_user)
        .flat();
      query._id = { $in: assignedUserIds };
    } else {
      query._id = { $in: [] };
    }
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Apply role filter
  if (role) {
    query.role = role;
  }

  // Get users matching the query
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .skip(skipValue)
    .limit(limitValue);

  // Get total number of users matching the query
  const totalRecords = await User.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limitValue);

  return res.status(200).json({
    status: "success",
    data: {
      users,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: pageValue,
        limit: limitValue,
      },
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Collections to delete related records
    const collections = [
      { model: Routine, key: "userId" },
      { model: Meal, key: "userId" },
      { model: Reminder, key: "userId" },
      { model: MealReminder, key: "userId" },
      { model: WaterReminder, key: "userId" },
      { model: Nutrition, key: "userId" },
      { model: Goal, key: "userId" },
      { model: Notification, key: "userId" },
      { model: Recommendation, key: "user_id" }, // Note: Use consistent naming across your schema
      { model: UserFiles, key: "userId" },
    ];

    // Delete related records
    for (const { model, key } of collections) {
      await model.deleteMany({ [key]: userId });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const [user, userfiles, userGoal, routine] = await Promise.all([
    User.findById(id),
    UserFiles.find({ userId: id }),
    Goal.findOne({ userId: id }),
  ]);
  res.status(200).json({
    status: "success",
    data: {
      user,
      userfiles,
      userGoal,
    },
  });
});

exports.getUserRoutine = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const goalData = await Goal.findOne(
    { userId },
    "weightGoal dailyWaterGoal dailyStepsGoal -_id"
  );
  res.status(200).json({
    status: "success",
    weightGoal: goalData?.weightGoal || null,
  });
});

exports.getCms = catchAsync(async (req, res, next) => {
  const { title } = req.params;
  const cmsContent = await Cms.findOne({ title });
  if (!cmsContent) {
    return res.status(404).json({ message: "Content not found" });
  }

  return res.status(200).json({
    status: "success",
    cmsContent,
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
    status: "success",
    cmsContent,
  });
});

exports.getContactUsList = catchAsync(async (req, res, next) => {
  const { page = 1, pageSize = 10, searchQuery = "" } = req.query;
  const query = {
    $or: [
      { name: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ],
  };

  const contacts = await Contact.find(query)
    .skip((page - 1) * pageSize)
    .limit(parseInt(pageSize));

  const totalContacts = await Contact.countDocuments(query);

  res.json({ contacts, totalRecords: totalContacts });

  return res.status(200).json({
    status: "success",
    contacts,
    totalRecords: totalContacts,
  });
});

exports.uploadVideos = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      console.error(err); // Log the error for debugging purpose
      return next(new AppError(err.message, 400));
    }

    let mainFile = null;
    let thumbnailFile = null;

    if (req.files && Array.isArray(req.files)) {
      mainFile = req.files.find(f => f.fieldname === 'file');
      thumbnailFile = req.files.find(f => f.fieldname === 'thumbnail');
    }

    if (!mainFile) {
      return next(new AppError('No main content file uploaded.', 400));
    }

    const { title, category, description } = req.body;

    let subcategoryId = null;
    if (req.body.subcategories && Array.isArray(req.body.subcategories) && req.body.subcategories.length > 0) {
      subcategoryId = req.body.subcategories[0];
    } else if (typeof req.body.subcategories === 'string' && req.body.subcategories) {
      subcategoryId = req.body.subcategories;
    }

    const subcategories = Array.isArray(req.body.subcategories)
      ? req.body.subcategories
      : [req.body.subcategories].filter(Boolean);

    if (!category || !subcategoryId) { // Now checking for a single subcategoryId
      return res.status(400).json({
        status: 'fail',
        message: 'Category and at least one subcategory are required.',
      });
    }

    const fileType = mainFile.mimetype.split('/')[0];
    const mainFilePath = `http://43.204.2.84:7200/uploads/${fileType}s/${mainFile.filename}`;

    let videoThumbnailPath = null;
    let audioThumbnailPath = null;

    if (thumbnailFile) {
      const thumbFileType = thumbnailFile.mimetype.split('/')[0];
      const thumbPath = `http://43.204.2.84:7200/uploads/images/${thumbnailFile.filename}`;

      if (fileType === 'video') {
        videoThumbnailPath = thumbPath;
      } else if (fileType === 'audio') {
        audioThumbnailPath = thumbPath;
      }
    }

    console.log({
      title,
      mainFilePath,
      category,
      subcategories : subcategoryId,
      description,
      fileType,
      videoThumbnailPath,
      audioThumbnailPath,
      // Add other relevant data for debugging
    }, "[---------------------Processed File Data------------------]");

    // Create a new entry in the database using your Video model
    const media = await Video.create({
      title,
      path: mainFilePath, // Path to the main content file
      category, // Category ID
      subcategories:subcategoryId, // Array of subcategory IDs
      description,
      filetype: fileType, // Derived file type (video, audio, application)
      thumbnail: videoThumbnailPath, // Thumbnail for video (if applicable)
      audioThumbnail: audioThumbnailPath, // Thumbnail for audio (if applicable)
    });

    // Send success response if media creation was successful
    if (media) {
      return res.status(200).json({
        status: 'success',
        media, // Return the created media object
      });
    } else {
      // Fallback for unexpected failure in media creation
      return res.status(500).json({
        status: 'fail',
        message: 'Failed to create media.',
      });
    }
  });
});

exports.getVideos = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const searchQuery = req.query.search;
  const categoryFilter = req.query.category;
  const filetypeFilter = req.query.filetype;

  const pipeline = [
    {
      $addFields: {
        // Safely convert 'category' to ObjectId. If it fails, set to null.
        categoryId: {
          $convert: {
            input: "$category",
            to: "objectId",
            onError: null, // Return null if conversion fails
            onNull: null, // Return null if input is null
          },
        },
        // Safely convert 'subcategories' to ObjectId. If it fails, set to null.
        subcategoryId: {
          $convert: {
            input: "$subcategories",
            to: "objectId",
            onError: null, // Return null if conversion fails
            onNull: null, // Return null if input is null
          },
        },
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
      $addFields: {
        categoryName: { $arrayElemAt: ["$categoryDetails.name", 0] },
        subcategoryName: { $arrayElemAt: ["$subcategoryDetails.name", 0] },
      },
    },
    {
      $match: {
        // Only include documents that have a valid category and subcategory lookup.
        // This implicitly filters out documents where categoryId or subcategoryId was null after conversion.
        "categoryDetails.0": { $exists: true },
        "subcategoryDetails.0": { $exists: true },
      },
    },
    {
      $match: {
        $and: [
          searchQuery
            ? {
              $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { tags: { $regex: searchQuery, $options: "i" } },
              ],
            }
            : {},
          categoryFilter ? { categoryName: categoryFilter } : {},
          filetypeFilter ? { filetype: filetypeFilter } : {},
        ],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ];

  // --- (Rest of your code for total count and pagination remains the same) ---

  const countPipeline = [...pipeline];
  countPipeline.push({ $count: "total" });

  const totalResults = await Video.aggregate(countPipeline);
  const totalCount = totalResults.length > 0 ? totalResults[0].total : 0;

  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  pipeline.push({
    $project: {
      _id: 0,
      id: "$_id",
      path: "$path",
      filetype: "$filetype",
      description: "$description",
      title: "$title",
      category: "$categoryName",
      subcategory: "$subcategoryName",
      thumbnail: "$thumbnail",
      audioThumbnail: "$audioThumbnail",
      views: "$views",
      likes: "$likes",
      createdAt: "$createdAt",
      tags: "$tags",
    },
  });

  const videos = await Video.aggregate(pipeline);

  if (videos.length === 0 && totalCount === 0) {
    return res.status(200).json({
      status: "success",
      message: "No media found matching your criteria.",
      data: [],
      totalCount: 0,
    });
  }

  return res.status(200).json({
    status: "success",
    data: videos,
    totalCount: totalCount,
  });
});

exports.getVideosByCategoryAndSubcategory = catchAsync(
  async (req, res, next) => {
    const { category } = req.params;
    const categoryDoc = await Category.findOne({ name: category });

    if (!categoryDoc) {
      return res.status(404).json({
        status: "fail",
        message: `Category with name "${category}" not found.`,
      });
    }

    const categoryId = categoryDoc._id.toString();

    const videosByCategoryAndSubcategory = await Video.aggregate([
      {
        $match: { category: categoryId },
      },
      {
        $addFields: {
          subcategories: {
            $convert: {
              input: "$subcategories",
              to: "objectId", // Convert subcategories from string to ObjectId
              onError: null, // Handle invalid conversions gracefully
              onNull: null,
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
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
              description: "$description",
              filetype: "$filetype",
              audioThumbnail: "$audioThumbnail",
              createdAt: "$createdAt",
            },
          },
        },
      },
      {
        $lookup: {
          from: "subcategories", // Subcategories collection name
          localField: "_id", // Subcategory ObjectId in the Video collection
          foreignField: "_id", // Subcategory ObjectId in the Subcategories collection
          as: "subcategoryInfo",
        },
      },
      {
        $unwind: "$subcategoryInfo", // Convert array to object
      },
      {
        $project: {
          _id: 0,
          subcategory: "$subcategoryInfo.name", // Use subcategory name
          videos: 1,
        },
      },
    ]);

    if (videosByCategoryAndSubcategory.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `No videos found for category "${category}"`,
      });
    }

    // Format the response
    const formattedResponse = {};
    videosByCategoryAndSubcategory.forEach((subcatData) => {
      formattedResponse[subcatData.subcategory] = subcatData.videos;
    });

    return res.status(200).json({
      status: "success",
      data: formattedResponse,
    });
  }
);

exports.dashboard = catchAsync(async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const userRole = req.user.role;

  let assignedUserCount;
  if (userRole === "host") {
    assignedUserCount = await Asign_User.countDocuments({ host: userId });
  }

  let mealQuery = {};
  if (userRole === "host") {
    mealQuery.coachId = userId;
  }

  let nuteQuery = {};
  if (userRole === "host") {
    nuteQuery.coachId = userId;
  }

  const [videoCount, userCount, coach, meal, nutrition] = await Promise.all([
    Video.countDocuments().exec(),
    User.countDocuments({ role: "user" }).exec(),
    User.countDocuments({ role: "host" }).exec(),
    Meal.countDocuments(mealQuery).exec(),
    Nutrition.countDocuments(nuteQuery).exec(),
  ]);

  return res.status(200).json({
    status: "success",
    data: {
      videos: videoCount || 0,
      users: userCount || 0,
      coach: coach || 0,
      meal: meal || 0,
      nutrition: nutrition || 0,
      assignedUserCount: assignedUserCount || 0,
    },
  });
});

const { ObjectId } = require("mongoose").Types;



exports.getHealthOtherdata = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
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

exports.assign = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed.", error: err });
    }

    let imageUrl = null;
    if (req.files && req.files.length > 0) {
      imageUrl = `http://43.204.2.84:7200/uploads/images/${req.files[0].filename}`;
    }
    const { host } = req.body;
    let { asign_user } = req.body;

    if (!asign_user || !host) {
      return res.status(400).json({ message: "Host and users are required." });
    }
    asign_user = Array.isArray(asign_user) ? asign_user : [asign_user];

    if (!ObjectId.isValid(host)) {
      return res.status(400).json({ message: "Invalid host ID." });
    }

    const hostData = await User.findById(host);
    if (!hostData) {
      return res.status(404).json({ message: "Host not found." });
    }

    const newAssignments = [];
    for (const userId of asign_user) {
      if (!ObjectId.isValid(userId)) {
        continue;
      }

      const query = { asign_user: userId, host };
      if (imageUrl) {
        query.imageUrl = imageUrl;
      }
      const existingAssignment = await Asign_User.findOne(query);
      if (existingAssignment) {
        continue;
      }

      const assignmentData = { asign_user: userId, host };
      if (imageUrl) {
        assignmentData.imageUrl = imageUrl;
      }
      const newAssignment = await Asign_User.create(assignmentData);
      newAssignments.push(newAssignment);

      await Notification.create({
        userId,
        message: `You have been appointed ${hostData.name} as your coach.`,
        type: "Appointed a coach",
        status: "sent",
      });

      const userData = await User.findById(userId);
      if (userData.device_token) {
        await sendPushNotification(
          userData.device_token,
          `You have been appointed ${hostData.name} as your coach.`,
          userId,
          "userApp",
          "assign",
          { hostId: hostData._id }
        );
      }
    }

    if (newAssignments.length === 0) {
      return res.status(200).json({
        message:
          "All users are already assigned to the host. No new assignments were made.",
      });
    }
    res.status(201).json({
      status: "success",
      message: `${newAssignments.length} user(s) assigned successfully.`,
      data: newAssignments,
    });
  });
});

exports.getassign = catchAsync(async (req, res, next) => {
  const assignments = await Asign_User.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "asign_user",
        foreignField: "_id",
        as: "assignedUserDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "host",
        foreignField: "_id",
        as: "hostDetails",
      },
    },
    {
      $unwind: "$hostDetails",
    },
    {
      $group: {
        _id: "$host",
        hostName: { $first: "$hostDetails.name" },
        hostEmail: { $first: "$hostDetails.email" },
        assignedUsers: {
          $push: {
            _id: "$_id", // Add the assignment's _id
            userId: "$asign_user",
            name: { $arrayElemAt: ["$assignedUserDetails.name", 0] },
            email: { $arrayElemAt: ["$assignedUserDetails.email", 0] },
            assignedAt: "$createdAt",
            imageUrl: "$imageUrl", // Use the imageUrl from Asign_User schema
          },
        },
      },
    },
    {
      $sort: {
        "assignedUsers.assignedAt": -1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
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
    status: "success",
    data: updatedAssignment,
  });
});

exports.deleteassign = catchAsync(async (req, res, next) => {
  console.log("dhjfh");
  const { id } = req.params;
  let deletedAssignment;
  if (req.query.type === "assignment") {
    deletedAssignment = await Asign_User.deleteMany({ host: id });
  }

  if (req.query.type === "user") {
    deletedAssignment = await Asign_User.findOneAndDelete({
      host: id,
      asign_user: req.query.userId,
    });
  }

  if (!deletedAssignment) {
    return res.status(404).json({ message: "Assignment not found." });
  }

  let message =
    req.query.type === "user"
      ? "User remove successfully."
      : "Assignment deleted successfully.";

  res.status(204).json({
    status: "success",
    message,
  });
});

exports.assignImageUpdate = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed.", error: err });
    }

    const { id } = req.params; // The ID of the Asign_User document
    let imageUrl = null;

    if (req.files && req.files.length > 0) {
      imageUrl = `http://43.204.2.84:7200/uploads/images/${req.files[0].filename}`;
    } else {
      return res.status(400).json({ message: "No image file provided." });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid assignment ID." });
    }

    const updatedAssignment = await Asign_User.findByIdAndUpdate(
      id,
      { imageUrl },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    res.status(200).json({
      status: "success",
      message: "Assignment image updated successfully.",
      data: updatedAssignment,
    });
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
  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
});

exports.createNutrition = async (req, res, next) => {
  try {
    const coachId = req.user.id;
    const { userId, category, items, description, inventoryId } = req.body;

    const data = {
      userId,
      coachId,
      inventoryId,
      mealTime: category,
      description,
      name: items[0]["name"],
      quantity: items[0]["quantity"],
    };

    const nutrition = await Nutrition.create(data);
    res.status(201).json({
      status: "success",
      message: "Nutrition created successfully!",
      data: nutrition,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateNutrition = async (req, res, next) => {
  try {
    const { userId, category, items, description, inventoryId } = req.body;

    if (!items || items.length !== 1) {
      return res.status(400).json({
        status: "fail",
        message:
          "Items should contain exactly one entry with name and quantity.",
      });
    }

    const updatedData = {
      userId,
      mealTime: category,
      description,
      // inventoryId,
      name: items[0]["name"],
      quantity: items[0]["quantity"],
    };

    const nutrition = await Nutrition.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!nutrition) {
      return res.status(404).json({
        status: "fail",
        message: "Nutrition not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Nutrition updated successfully!",
      data: nutrition,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNutrition = async (req, res, next) => {
  try {
    const nutrition = await Nutrition.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "Delete successfully!",
      data: nutrition,
    });
  } catch (error) {
    next(error);
  }
};

exports.createMeal = async (req, res, next) => {
  try {
    const coachId = req.user.id;
    const meal = await Meal.create({ ...req.body, coachId });
    res.status(201).json({
      status: "success",
      message: "Meal created successfully!",
      data: meal,
    });
  } catch (error) {
    next(error);
  }
};

// Update Meal API
exports.updateMeal = async (req, res, next) => {
  try {
    const { mealId } = req.params;
    const updatedData = req.body;
    const coachId = req.user.id;

    const meal = await Meal.findOneAndUpdate({ _id: mealId }, updatedData, {
      new: true,
    });

    if (!meal) {
      return res.status(404).json({
        status: "fail",
        message: "Meal not found or you are not authorized to edit this meal.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Meal updated successfully!",
      data: meal,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Meal API
exports.deleteMeal = async (req, res, next) => {
  try {
    const { mealId } = req.params;
    const coachId = req.user.id;

    let query = { _id: mealId };
    if (req.user.role === "host") query.coachId = coachId;

    const meal = await Meal.findOneAndDelete(query);

    if (!meal) {
      return res.status(404).json({
        status: "fail",
        message:
          "Meal not found or you are not authorized to delete this meal.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Meal deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

exports.getNutritions = async (req, res, next) => {
  try {
    const coachId = req.user.id;
    let query = {};
    if (req.user.role === "host") {
      query.coachId = new ObjectId(coachId);
    }

    const nutritions = await Nutrition.find(query);

    const userIds = [
      ...new Set(nutritions.map((item) => item.userId.toString())),
    ];
    const userObjectIds = userIds.map((id) => new mongoose.Types.ObjectId(id));

    const routines = await Routine.find({ userId: { $in: userObjectIds } });

    const groupedByUser = await Nutrition.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$userId",
          nutritions: {
            $push: {
              _id: "$_id",
              userId: "$userId",
              description: "$description",
              quantity: "$quantity",
              mealTime: "$mealTime",
              active: "$active",
              status: "$status",
              name: "$name",
            },
          },
        },
      },
    ]);

    const results = await Promise.all(
      groupedByUser.map(async (userGroup) => {
        const userId = userGroup._id;
        const userDetails = await User.findById(userId);
        const getStockQuantity = await Inventory.findOne({ userId }).sort({
          createdAt: -1,
        });

        const groupedByMealTime = userGroup.nutritions.reduce(
          (acc, nutrition) => {
            const mealTime = nutrition.mealTime;
            if (!acc[mealTime]) {
              acc[mealTime] = [];
            }
            acc[mealTime].push(nutrition);
            return acc;
          },
          {}
        );

        const mealTimeGroups = await Promise.all(
          Object.entries(groupedByMealTime).map(
            async ([mealTime, nutritions]) => {
              const processedNutritions = await Promise.all(
                nutritions.map(async (nutrition) => {
                  const userRoutines = routines.filter(
                    (routine) =>
                      routine.userId.toString() === nutrition.userId.toString()
                  );
                  let takenCount = 0;
                  let skippedCount = 0;
                  userRoutines.forEach((routine) => {
                    if (
                      routine.nutrition &&
                      routine.nutrition[mealTime?.toLowerCase().trim()]
                    ) {
                      const mealTimeData =
                        routine.nutrition[mealTime?.toLowerCase().trim()];
                      mealTimeData?.items?.forEach((item) => {
                        if (item.toString() === nutrition._id.toString()) {
                          if (mealTimeData.status === "take") {
                            takenCount++;
                          } else if (mealTimeData.status === "skip") {
                            skippedCount++;
                          }
                        }
                      });
                    }
                  });

                  const isCompleted = takenCount === nutrition.quantity;

                  if (isCompleted) {
                    await Nutrition.updateOne(
                      { _id: nutrition._id },
                      { status: 1 }
                    );
                  }

                  return {
                    _id: nutrition._id,
                    mealTime: nutrition.mealTime,
                    description: nutrition.description,
                    quantity: nutrition.quantity,
                    active: nutrition.active,
                    status: isCompleted ? "completed" : "in progress",
                    name: nutrition.name,
                    takenCount,
                    skippedCount,
                    isCompleted,
                    stockQuantity: getStockQuantity?.quantity || 0,
                  };
                })
              );

              return {
                mealTime,
                nutritionDetails: processedNutritions,
              };
            }
          )
        );

        return {
          userDetails: {
            name: userDetails?.name || userDetails?.email,
            email: userDetails?.email,
          },
          userId,
          mealTimeGroups,
        };
      })
    );

    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (error) {
    console.error("Error in getNutritions:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching nutrition data.",
    });
    next(error);
  }
};

exports.getMeals = async (req, res, next) => {
  try {
    const coachId = req.user.id;
    let query = { active: true };
    if (req.user.role === "host") {
      query.coachId = new mongoose.Types.ObjectId(coachId);
    }
    const mealsByUserAndCategory = await Meal.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $group: {
          _id: {
            userId: "$userId",
            userName: "$userDetails.name",
            userEmail: "$userDetails.email",
            category: "$category",
          },
          meals: { $push: { itemId: "$_id", itemName: "$item" } },
        },
      },
      { $sort: { "_id.userId": 1, "_id.category": 1 } },
    ]);

    const result = mealsByUserAndCategory.reduce(
      (acc, { _id: { userId, userName, userEmail, category }, meals }) => {
        let userEntry = acc.find(
          (user) => user.userId.toString() === userId.toString()
        );
        if (!userEntry) {
          userEntry = {
            userId,
            name: userName,
            email: userEmail,
            meals: {},
          };
          acc.push(userEntry);
        }

        userEntry.meals[category] = meals.map((meal) => ({
          itemId: meal.itemId,
          itemName: meal.itemName,
        }));

        return acc;
      },
      []
    );

    res.status(200).json({
      status: "success",
      data: result,
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

  const category = await Category.create(req.body);

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
  const { name, type } = req.body;

  if (!name) {
    return next(new AppError("Category name is required", 400));
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { name, type },
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
    return next(
      new AppError("Both SubCategory name and Category ID are required", 400)
    );
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  const subCategory = await SubCategory.create({ name, category: categoryId });

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
      return next(new AppError("No files uploaded.", 400));
    }

    const { title, description, link } = req.body;
    const imageUrl = `http://43.204.2.84:7200/uploads/images/${req.files[0].filename}`;
    const newBanner = await Banner.create({
      title,
      description,
      imageUrl,
      link: link ?? "",
    });

    res.status(201).json({
      status: "success",
      message: "Banner created successfully.",
      data: newBanner,
    });
  });
});

exports.getBanners = catchAsync(async (req, res, next) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  if (!banners) {
    return next(new AppError("No banners found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: banners,
  });
});

exports.toggleBannerStatus = catchAsync(async (req, res, next) => {
  const { bannerId } = req.params;

  const banner = await Banner.findById(bannerId);
  if (!banner) {
    return next(new AppError("Banner not found.", 404));
  }

  banner.isActive = !banner.isActive;
  await banner.save();

  res.status(200).json({
    status: "success",
    message: `Banner status updated to ${banner.isActive ? "active" : "inactive"
      }.`,
    data: banner,
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const { bannerId } = req.params;

  const banner = await Banner.findByIdAndDelete(bannerId);
  if (!banner) {
    return next(new AppError("Banner not found.", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Banner deleted successfully.",
  });
});

exports.getUserRecomenedVideo = catchAsync(async (req, res, next) => {
  const user_id = req.params.id;
  const videos = await Recommendation.find({ user_id }).populate("video_id");
  res.status(201).json({
    status: "success",
    message: "successfully.",
    data: videos,
  });
});

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
      ...mealReminders.map((reminder) => ({
        ...reminder.toObject(),
        type: "meal",
      })),
      ...waterReminders.map((reminder) => ({
        ...reminder.toObject(),
        type: "water",
      })),
      ...otherReminders.map((reminder) => {
        return {
          ...reminder.toObject(),
          type: reminder.reminder_type || "other",
        };
      }),
    ];
    res.status(200).json({
      message: "All reminders fetched successfully.",
      reminders: allReminders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching reminders.",
      error: error.message,
    });
  }
});

exports.deleteVideo = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const videos = await Video.findByIdAndDelete(_id);
  if (videos) {
    await Recommendation.findOneAndDelete({ video_id: _id });
  }
  res.status(201).json({
    status: "success",
    message: "successfully.",
    data: videos,
  });
});

exports.getGoalAnalytics = catchAsync(async (req, res, next) => {
  let { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    const currentDate = new Date();
    endDate = currentDate.toISOString().split("T")[0];
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 20);
    startDate = pastDate.toISOString().split("T")[0];
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const users = await User.find({ role: "user" }).select("_id");
  const userIds = users.map((user) => user._id);

  const routines = await Routine.find({
    userId: { $in: userIds },
    date: {
      $gte: start.toISOString().split("T")[0],
      $lte: end.toISOString().split("T")[0],
    },
  });

  const goals = await Goal.find({ userId: { $in: userIds } });

  const calculatePercentage = (achieved, target) => {
    if (!target || target === 0) return 0;
    return Math.min((achieved / target) * 100, 100);
  };

  const dailySummary = {};

  routines.forEach((routine) => {
    const { date, userId } = routine;
    const userGoal = goals.find((goal) => goal.userId.equals(userId));
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

    const bodyFatPercentage = calculatePercentage(
      parseFloat(body_fat),
      targetBodyFat
    );
    const bmiPercentage = calculatePercentage(parseFloat(bmi), targetBMI);
    const muscleMassPercentage = calculatePercentage(
      parseFloat(muscle_mass),
      targetMuscleMass
    );

    // You can combine these percentages based on your logic for achieving the goal
    const totalBodyGoalPercentage =
      (bodyFatPercentage + bmiPercentage + muscleMassPercentage) / 3;

    if (totalBodyGoalPercentage >= 100)
      dailySummary[day].totalBodyGoalsAchieved++;
  });

  const categories = Object.keys(dailySummary).sort();
  const goalData = categories.map((date) => {
    const {
      totalUsers,
      totalGoalAchieved,
      totalStepsAchieved,
      totalWaterAchieved,
      totalBodyGoalsAchieved,
    } = dailySummary[date];
    const totalGoalsCompleted =
      totalStepsAchieved + totalWaterAchieved + totalBodyGoalsAchieved;
    return ((totalGoalsCompleted / (totalUsers * 3)) * 100).toFixed(2); // Adjust for number of goals (steps, water, body goals)
  });

  res.status(200).json({
    status: "success",
    data: {
      categories,
      series: [{ name: "Achieve Goal", data: goalData }],
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

    const categories = stats.map((item) => {
      const date = new Date(item._id);
      const options = { weekday: "short", month: "short", day: "numeric" };
      return `${date.toLocaleDateString("en-US", options)}`;
    });
    const userData = stats.map((item) => item.totalUsers);
    const coachData = stats.map((item) => item.totalCoaches);
    res.status(200).json({
      status: "success",
      data: {
        categories,
        series: [
          { name: "Users", data: userData },
          { name: "Coaches", data: coachData },
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
      return next(new AppError("No files uploaded.", 400));
    }

    const { googleMeetLink, roles, meetingDate, meetingTime, category } =
      req.body; // Add category
    if (!googleMeetLink || !roles || roles.length === 0 || !category) {
      // Validate category
      return res.status(400).json({
        status: "fail",
        message: "Meet link, roles, and category are required.",
      });
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
        return fileData;
      })
    );

    const newMeeting = await Meeting.create({
      googleMeetLink,
      image: uploadedFiles[0].path,
      roles,
      meetingDate,
      meetingTime,
      category, // Include category
    });

    if (newMeeting) {
      let usersToNotify = [];
      if (roles.includes("user")) {
        const users = await User.find({ role: "user" });
        usersToNotify = [...usersToNotify, ...users];
      }

      if (roles.includes("coach")) {
        const coaches = await User.find({ role: "coach" });
        usersToNotify = [...usersToNotify, ...coaches];
      }

      // Parse meeting date and time
      const [year, month, day] = newMeeting.meetingDate.toISOString().split('T')[0].split('-').map(Number);
      const [hour, minute] = newMeeting.meetingTime.split(':').map(Number);
      const meetingDateTime = new Date(year, month - 1, day, hour, minute);
      const now = new Date();
      const timeDiff = (meetingDateTime - now) / (1000 * 60);

      const reminderMessage = `You have a meeting scheduled on ${newMeeting.meetingDate.toISOString().split('T')[0]} at ${newMeeting.meetingTime}.`;

      for (const user of usersToNotify) {
        const app = roles.includes("coach") && user.role === "coach" ? "partnerApp" : "userApp";

        if (timeDiff <= 30 && timeDiff > 0) {
          // Send immediate notification if meeting is within or at 30 minutes
          await sendPushNotification(
            user.device_token,
            reminderMessage,
            user._id,
            app,
            "Reminder",
            { meetingId: newMeeting._id, link: googleMeetLink },
          );
        }
      }

      return res.status(200).json({
        status: "success",
        message: "Meeting created and notifications sent successfully.",
        meeting: newMeeting,
      });
    } else {
      return res.status(500).json({
        status: "fail",
        message: "Failed to create the meeting.",
      });
    }
  });
});

exports.getMeeting = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.find({}).sort({ createdAt: -1 });
  if (meeting) {
    res.status(200).json({
      status: "success",
      meeting,
    });
  }
});

exports.updateMeeting = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    const meetingId = req.params.id;
    const { googleMeetLink, roles, meetingDate, meetingTime, category } =
      req.body; // Add category

    if (!googleMeetLink || !roles || roles.length === 0 || !category) {
      // Validate category
      return res.status(400).json({
        status: "fail",
        message: "Meet link, roles, and category are required.",
      });
    }

    let updatedData = {
      googleMeetLink,
      roles,
      meetingDate,
      meetingTime,
      category, // Include category
    };

    if (req.files && req.files.length > 0) {
      const uploadedFiles = await Promise.all(
        req.files.map(async (file) => {
          const fileType = file.mimetype.split("/")[0];
          const filePath = `http://43.204.2.84:7200/uploads/${fileType}s/${file.filename}`;
          return {
            fileName: file.filename,
            path: filePath,
            mimeType: fileType,
          };
        })
      );
      updatedData.image = uploadedFiles[0].path;
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedMeeting) {
      return res.status(200).json({
        status: "success",
        message: "Meeting updated successfully.",
        meeting: updatedMeeting,
      });
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Meeting not found.",
      });
    }
  });
});

exports.deleteMeeting = catchAsync(async (req, res, next) => {
  const meetingId = req.params.id;

  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    return res.status(404).json({
      status: "fail",
      message: "Meeting not found.",
    });
  }

  await Meeting.findByIdAndDelete(meetingId);

  res.status(200).json({
    status: "success",
    message: "Meeting deleted successfully.",
  });
});

exports.addHighlight = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    if (!req.files || req.files.length === 0) {
      return next(new AppError("No files uploaded.", 400));
    }

    const filePath = `http://43.204.2.84:7200/uploads/images/${req.files[0].filename}`;
    const newHighlight = await Highlight.create({ url: filePath });
    res.status(201).json({
      status: "success",
      message: "Highlight added successfully.",
      data: newHighlight,
    });
  });
});

exports.getHighlights = catchAsync(async (req, res, next) => {
  const highlights = await Highlight.find();
  res.status(200).json({
    status: "success",
    data: { highlights },
  });
});

exports.deleteHighlight = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const highlight = await Highlight.findByIdAndDelete(id);

  if (!highlight) {
    return next(new AppError("Highlight not found", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Highlight deleted successfully.",
  });
});

// Create Introduction
exports.createIntroduction = catchAsync(async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return next(new AppError(err.message, 400));
    } else if (err) {
      return next(new AppError(err.message, 400));
    }

    if (!req.files) {
      return next(new AppError("No file uploaded.", 400));
    }

    const { title, description } = req.body;
    const imageUrl = `http://43.204.2.84:7200/uploads/images/${req.files[0].filename}`;
    const newIntroduction = await Introduction.create({
      title,
      description,
      imageUrl,
    });

    res.status(201).json({
      status: "success",
      message: "Introduction created successfully.",
      data: newIntroduction,
    });
  });
});

// Get All Introductions
exports.getIntroductions = catchAsync(async (req, res, next) => {
  const introductions = await Introduction.find().sort({ createdAt: -1 });
  if (!introductions || introductions.length === 0) {
    return next(new AppError("No introductions found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: introductions,
  });
});

// Toggle Introduction Status
exports.toggleIntroductionStatus = catchAsync(async (req, res, next) => {
  const { introductionId } = req.params;

  const introduction = await Introduction.findById(introductionId);
  if (!introduction) {
    return next(new AppError("Introduction not found.", 404));
  }

  introduction.isActive = !introduction.isActive;
  await introduction.save();

  res.status(200).json({
    status: "success",
    message: `Introduction status updated to ${introduction.isActive ? "active" : "inactive"
      }.`,
    data: introduction,
  });
});

// Delete Introduction
exports.deleteIntroduction = catchAsync(async (req, res, next) => {
  const { introductionId } = req.params;

  const introduction = await Introduction.findByIdAndDelete(introductionId);
  if (!introduction) {
    return next(new AppError("Introduction not found.", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Introduction deleted successfully.",
  });
});



exports.unique_categories = catchAsync(async (req, res, next) => {
  const categoryIds = await Video.distinct('category');
  const categories = await Promise.all(
    categoryIds.map(async (categoryId) => {
      const category = await Category.findById(categoryId).select('name');
      return category?.name;
    })
  );
  const filteredNames = categories.filter(Boolean);

  res.status(200).json({ categories: filteredNames });
});


exports.unique_filetypes = catchAsync(async (req, res, next) => {
  const filetypes = await Video.distinct('filetype');
  res.status(200).json({ filetypes });
});


const Inventory = require("../models/Inventory");
const Asign_user = require("../models/Asign_user");
const catchAsync = require("../utils/catchAsync");

exports.createInventory = catchAsync(async (req, res, next) => {
  if (!req.body.userId || !req.body.title) {
    return res.status(400).json({ message: "Validation are required" });
  }

  let getUser = await Asign_user.findOne({ asign_user: req.body.userId });
  if (!getUser) {
    return res.status(400).json({ message: "User not found" });
  }

  req.body.coachId = getUser.host;
  if (req.body.inventoryId) {
    await Inventory.findByIdAndUpdate(req.body.inventoryId, req.body);
  } else {
    await Inventory.create(req.body);
  }
  res
    .status(201)
    .json({ message: "User created successfully", status: "success" });
});

exports.getInventory = catchAsync(async (req, res, next) => {
  const goal = await Inventory.find({
    userId: req.params.userId,
  });
  res.status(200).json({
    status: "success",
    data: goal,
    message: "Get Inventory successfully.",
  });
});

exports.deleteInventory = catchAsync(async (req, res, next) => {
  const goal = await Inventory.findById(req.params.id);
  if (!goal) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  await Inventory.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: goal,
    message: "Inventory deleted successfully.",
  });
});

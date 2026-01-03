const { default: mongoose } = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isAdminAdded: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Inventory", inventorySchema);
module.exports = Conversation;

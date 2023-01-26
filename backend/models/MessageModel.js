const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: [150, "Message cannot be more than 150 characters"],
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    roomID: {
      type: mongoose.ObjectId,
      ref: "Room",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", MessageSchema);

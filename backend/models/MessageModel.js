const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    messageID: {
      type: mongoose.ObjectId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
      required: true,
      maxlength: [150, "Message cannot be more than 150 characters"],
    },
    userID: {
      type: mongoose.ObjectId,
    },
    roomID: {
      type: mongoose.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", MessageSchema);

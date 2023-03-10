const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: [true, "Please provide a name for this chat room."],
    maxlength: [30, " Name cannot be more than 30 characters"],
  },
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);

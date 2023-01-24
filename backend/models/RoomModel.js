const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  chatRoomID: {
    type: mongoose.ObjectId,
  },
  roomName: {
    type: String,
    required: [true, "Please provide a name for this chat room."],
    maxlength: [30, " Name cannot be more than 30 characters"],
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Participant",
  },
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);

import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
  roomName: {
    type: String,
    required: [true, "Please provide a name for this chat room."],
    maxlength: [30, " Name cannot be more than 30 characters"],
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: [
    { type: mongoose.Schema.ObjectId, 
      ref: "User", 
      required: true },
  ],
  groupAdmin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  latestMessage: {
    type: mongoose.Schema.ObjectId,
    ref: "Message",
  },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChatRoom", ChatRoomSchema);

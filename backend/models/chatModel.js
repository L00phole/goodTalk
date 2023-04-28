import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
  chatName: {
    type: String,
    required: [true, "Please provide a name for this chat room."],
    maxlength: [30, " Name cannot be more than 30 characters"],
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }],
  groupAdmin: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  latestMessage: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
  },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);

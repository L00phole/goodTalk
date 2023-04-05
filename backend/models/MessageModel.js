import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: [150, "Message cannot be more than 150 characters"],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Message", MessageSchema);

import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import Chat from "../models/chatModel.js";
import { StatusCodes } from "http-status-codes";

const sendMessage = async (req, res) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    return BadRequestError("Please Provide All Fields To send Message");
  }

  let newMessage = {
    sender: req.user.id,
    message: message,
    chat: chatId,
  };

  let m = await Message.create(newMessage);

  m = await m.populate("sender", "username");
  m = await m.populate("chat");
  m = await User.populate(m, {
    path: "chat.users",
    select: "username email _id",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: m }, { new: true });

  res.status(StatusCodes.OK).json(m);
};

const allMessages = async (req, res) => {
  const { chatId } = req.params;

  const getMessage = await Message.find({ chat: chatId })
    .populate("sender", "username email _id")
    .populate("chat");

  res.status(StatusCodes.OK).json(getMessage);
};

export { allMessages, sendMessage };

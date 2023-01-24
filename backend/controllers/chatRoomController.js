const asyncHandler = require("express-async-handler");
const ChatRoom = require("../models/RoomModel");

//Get ChatRoom
//GET
const getChatRoom = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.find();
  res.status(200).json(chatRoom);
});

// set ChatRoom
//POST
const setChatRoom = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.create({ text: req.body.text });

  res.status(200).json(chatRoom);
});

//update ChatRoom
//PUT
const updateChatRoom = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.findById(req.params.id);

  if (!chatRoom) {
    res.status(400);
    throw new Error("ChatRoom not found");
  }
  const updateChatRoom = await ChatRoom.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ chatRoom: `update ChatRoom ${req.params.id}` });
});

//delete ChatRoom
//DELETE
const deleteChatRoom = asyncHandler(async (req, res) => {
  const chatRoom = await ChatRoom.findById(req.params.id);
  if (!chatRoom) {
    res.status(400);
    throw new Error("ChatRoom not found");
  }

  await chatRoom.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getChatRoom,
  setChatRoom,
  updateChatRoom,
  deleteChatRoom,
};

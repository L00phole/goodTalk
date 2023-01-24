const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");

//Get messages
//GET
const getMessage = asyncHandler(async (req, res) => {
  const messages = await Message.find();
  res.status(200).json(messages);
});

// set messages
//POST
const setMessage = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const message = await Message.create({ text: req.body.text });

  res.status(200).json(message);
});

//update messages
//PUT
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error("message not found");
  }
  const updateMessage = await Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: `update message ${req.params.id}` });
});

//delete messages
//DELETE
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    res.status(400);
    throw new Error("message not found");
  }

  await message.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
};

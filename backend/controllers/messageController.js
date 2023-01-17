const asyncHandler = require("express-async-handler");

//Get messades
//GET
const getMessage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get message" });
});
// set messades
//POST
const setMessage = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: "set message" });
});
//update messades
//PUT
const updateMessage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update message ${req.params.id}` });
});
//delete messades
//DELETE
const deleteMessage = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete message ${req.params.id}` });
});

module.exports = {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
};

const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

//Get user
//GET
const getUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  // OUR FIRST ACL RULE
  // only allow a logged in user with the role "user" to see the list of
  // + we should really change this to only admin/superAdmins soon
  if (req.session.user && req.session.user.userRole === "admin") {
    res.status(200).json(users);
  } else {
    res.status(403).json({ _error: "Not allowed" });
  }
});

// add user
//POST
const setUser = asyncHandler(async (req, res) => {
  const user = await User.create({ text: req.body.text });

  res.status(200).json(user);
});

//update user
//PUT
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ user: `update user${req.params.id}` });
});

//delete user
//DELETE
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }

  await user.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser,
};

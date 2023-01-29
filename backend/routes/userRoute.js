const express = require("express");
const router = express.Router();
const {
  getUser,
  setUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

router.route("/").get(getUser).post(setUser);

router.route("/:id").delete(deleteUser).put(updateUser).get(getUserById);

module.exports = router;

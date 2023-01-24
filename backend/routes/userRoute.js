const express = require("express");
const router = express.Router();
const {
  getUser,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUser).post(setUser);

router.route("/:id").delete(deleteUser).put(updateUser);

module.exports = router;

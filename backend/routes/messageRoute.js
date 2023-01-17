const express = require("express");
const router = express.Router();
const {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

router.route("/").get(getMessage).post(setMessage);

router.route("/:id").delete(deleteMessage).put(updateMessage);

module.exports = router;

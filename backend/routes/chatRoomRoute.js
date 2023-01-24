const express = require("express");
const router = express.Router();

const {
  getChatRoom,
  setChatRoom,
  updateChatRoom,
  deleteChatRoom,
} = require("../controllers/ChatRoomController");

router.route("/").get(getChatRoom).post(setChatRoom);

router.route("/:id").delete(deleteChatRoom).put(updateChatRoom);

module.exports = router;

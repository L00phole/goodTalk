import express from "express";
const router = express.Router();

import {
 
  getChat,
  getChats,
  createGroup,
  removeFromGroup,
  renameGroup,
  addUserToGroup,
} from "../controllers/ChatRoomController.js";

router.route("/").post(getChat).get(getChats);
router.route("/createRoom").post(createGroup);
router.route("/updateRoom").patch(renameGroup);
router.route("/removeFromGroup").patch(removeFromGroup);
router.route("/addUserToGroup").patch(addUserToGroup);


export default router;

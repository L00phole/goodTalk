import express from "express";
const router = express.Router();

import {
 
  getChat,
  getChats,
  createGroup,
  removeFromGroup,
  renameGroup,
  addUserToGroup,
} from "../controllers/chatController.js";

router.route("/").post(getChat).get(getChats);
router.route("/createGroup").post(createGroup);
router.route("/renameGroup").patch(renameGroup);
router.route("/removeFromGroup").patch(removeFromGroup);
router.route("/addUserToGroup").patch(addUserToGroup);


export default router;

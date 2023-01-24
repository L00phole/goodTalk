const express = require("express");
const router = express.Router();

const {
  getParticipant,
  setParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantController");

router.route("/").get(getParticipant).post(setParticipant);

router.route("/:id").delete(deleteParticipant).put(updateParticipant);

module.exports = router;

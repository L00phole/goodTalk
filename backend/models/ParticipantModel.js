const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  userID: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  chatRoomID: {
    type: mongoose.ObjectId,
    ref: "Room",
  },
  isOwner: Boolean,
  isBlocked:
    Boolean /* needed ? or remove completely from room participants? */,
});
module.exports = mongoose.model("Participant", ParticipantSchema);

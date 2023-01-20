const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  participantID: {
    type: mongoose.ObjectId,
  },
  userID: {
    type: mongoose.ObjectId,
  },
  chatRoomID: {
    type: mongoose.ObjectId,
  },
  isBlocked: Boolean,
});
module.exports = mongoose.model("Participant", ParticipantSchema);

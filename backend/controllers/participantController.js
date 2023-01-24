const asyncHandler = require("express-async-handler");
const Participant = require("../models/ParticipantModel");

//find participants
//GET
const getParticipant = asyncHandler(async (req, res) => {
  const participants = await Participant.find();
  res.status(200).json(participants);
});

//add participant
//POST
const setParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.create();

  res.status(200).json(participant);
});

//update participant
//PUT
const updateParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);

  if (!participant) {
    res.status(400);
    throw new Error("participant not found");
  }
  const updateParticipant = await Participant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200), json({ participant: `update participant ${req.params.id}` });
});

//delete participant
//DELETE
const deleteParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(re.params.id);
  if (!participant) {
    res.status(400);
    throw new Error("participant not found");
  }
  await participant.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getParticipant,
  setParticipant,
  updateParticipant,
  deleteParticipant,
};

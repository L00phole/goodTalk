import { StatusCodes } from "http-status-codes";
import ChatRoom from "../models/RoomModel.js";
import User from "../models/UserModel.js";


const getChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.send("No User Exists!");
  }

  let room = await ChatRoom.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  room = await User.populate(room, {
    path: "latestMessage.userID",
    select: "username email fullName _id",
  });

  if (room.length > 0) {
    res.send(room[0]);
  } else {
    const createChat = await ChatRoom.create({
      roomName: "userID",
      isGroupChat: false,
      users: [req.user.id, userId],
    });

    const fullChat = await ChatRoom.findOne({ _id: createChat._id }).populate(
      "users",
      "-password"
    );

    res.status(StatusCodes.OK).json(fullChat);
  }
};

const getChats = async (req, res) => {
  const room = await ChatRoom.find({ users: { $elemMatch: { $eq: req.user.id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const user = await User.populate(room, {
    path: "latestMessage.userID",
    select: "username email fullName _id",
  });

  res.status(StatusCodes.OK).json(user);
};

const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user.id);

  const groupChat = await ChatRoom.create({
    roomName: req.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user.id,
  });

  const fullGroupChat = await ChatRoom.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(fullGroupChat);
};

const renameGroup = async (req, res) => {
  const { chatId, roomName } = req.body;

  const updateChat = await ChatRoom.findByIdAndUpdate(
    chatId,
    {
      roomName: roomName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.json(updateChat);
  }
};

const addUserToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const addUser = await ChatRoom.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addUser) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.status(StatusCodes.OK).json(addUser);
  }
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removeUser = await ChatRoom.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removeUser) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.status(StatusCodes.OK).json(removeUser);
  }
};

export {
  getChat,
  getChats,
  createGroup,
  removeFromGroup,
  renameGroup,
  addUserToGroup,
};

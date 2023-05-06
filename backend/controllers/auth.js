import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const register = async (req, res) => {
  await body("username")
    .isLength({ min: 3 })
    .trim()
    .notEmpty()
    .escape()
    .run(req);
  await body("email").isEmail().normalizeEmail().run(req);
  await body("password").isLength({ min: 8 }).trim().escape().run(req);

  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  // }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("Please Provide All Values");
  }

  const isUserExists = await User.findOne({ email: email }).lean();

  if (isUserExists) {
    throw new BadRequestError("User with this Email Already Exists");
  }

  //hashing password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  console.log("JWT_LIFETIME", process.env.JWT_LIFETIME);
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      userEmail: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME || "1d",
    }
  );

  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    throw new BadRequestError("Please Provide All the Values");
  }

  const isUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  }).lean();

  if (!isUser) {
    throw new NotFoundError("Invalid Credentials");
  }

  //compare password
  const comparePassword = await bcrypt.compare(password, isUser.password);

  if (!comparePassword) {
    throw new BadRequestError(
      "Please Make Sure You have entered Correct Password!"
    );
  }

  console.log("JWT_LIFETIME", process.env.JWT_LIFETIME);
  const token = jwt.sign(
    {
      userId: isUser._id,
      username: isUser.username,
      userEmail: isUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME || "1d",
    }
  );

  res.status(StatusCodes.OK).json({
    _id: isUser._id,
    username: isUser.username,
    email: isUser.email,
    token,
  });
};

const searchUser = async (req, res) => {
  // await query("search").isLength({ min: 3 }).trim().escape().run(req);
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  // }

  const { search } = req.query;

  const user = await User.find({
    $or: [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { _id: search },
    ],
  }).select("username _id email ");

  res.status(StatusCodes.OK).json(user);
};

export { register, login, searchUser };

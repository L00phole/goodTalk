import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";

// const auth = asyncHandler(async (req, res, next) => {
// let token;

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new Error("Authentication Invalid");
//   }
//    token = authHeader.split(" ")[1];
//    try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(payload.userId).select('password');
//     if (!user) {
//       throw new Error('User not found');
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Error retrieving user', error);
//     res.status(401);
//     throw new Error('Authentication Invalid');
//   }
// });
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid 2");
  }
};
export default auth;

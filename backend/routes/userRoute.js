import express from "express";
const router = express.Router();
import { register, login, searchUser } from "../controllers/auth.js";
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 min",
});
import authentication from "../middleware/authMiddleware.js";


router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/users").get(authentication, searchUser);


export default router;

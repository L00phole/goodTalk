import express from "express";
const router = express.Router();
import { register, login, searchUser } from "../controllers/auth.js";
import rateLimiter from "express-rate-limit";
import authenticateUser from "../middleware/authMiddleware.js";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 min",
});

const requestSizeLimit = "10mb"; // Set the maximum request size limit to 10MB

router.use(express.json({ limit: requestSizeLimit }));

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/users").get(authenticateUser, searchUser);

export default router;

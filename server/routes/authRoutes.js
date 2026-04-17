import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import {
  signup,
  verifyOTP,
  login
} from "../controllers/authController.js";

import { getStudentProfile } from "../controllers/authController.js";

const router = express.Router();

// router.get("/feedback", authMiddleware, getFeedback);
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, getStudentProfile);

export default router;
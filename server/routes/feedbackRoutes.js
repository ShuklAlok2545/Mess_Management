import express from "express";
import {
  createFeedback,
  getMyFeedbacks,
  getAdminFeedbacks,
} from "../controllers/feedbackController.js";

import { authMiddleware, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student
router.post("/create", authMiddleware, createFeedback);
router.get("/my", authMiddleware, getMyFeedbacks);

// Admin
router.get("/admin", adminAuth, getAdminFeedbacks);

export default router;
import express from "express";
import {
  adminLogin,
  getMealCount,
} from "../controllers/adminController.js";
import {
  sendAdminOtp,
  verifyAdminOtpAndSignup
} from "../controllers/adminController.js";
import { adminAuth } from "../middleware/authMiddleware.js";
import { getStudentsByAdmin, getAdminProfile, getTodayReport ,getStudentHistory,downloadStudentHistoryPDF} from "../controllers/adminController.js";


const router = express.Router();

router.post("/send-otp", sendAdminOtp);
router.post("/verify-otp", verifyAdminOtpAndSignup);
router.post("/login", adminLogin);
router.get("/students", adminAuth, getStudentsByAdmin);
router.get("/report/today", adminAuth, getTodayReport);
router.get("/student-history/:studentId", adminAuth, getStudentHistory);
router.get(
  "/student-history-pdf/:studentId",
  adminAuth,
  downloadStudentHistoryPDF
);
router.get("/meal-count", adminAuth, getMealCount);
router.get("/profile", adminAuth, getAdminProfile);

export default router;
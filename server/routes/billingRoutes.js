import express from "express";
import {
  setDailyExpense,
  generateBills,
  getMyDynamicBills,
} from "../controllers/billingController.js";

import { adminAuth ,authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set-expense", adminAuth, setDailyExpense);
router.post("/generate", adminAuth, generateBills);
router.get("/my-dynamic", authMiddleware, getMyDynamicBills);

export default router;
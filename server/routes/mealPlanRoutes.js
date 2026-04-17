import express from "express";
import {
  setMealPlan,
  getMyMealPlan,
} from "../controllers/mealPlanController.js";
import { getMonthlyAttendance } from "../controllers/mealPlanController.js";

const router = express.Router();

router.post("/set", setMealPlan);
router.get("/my", getMyMealPlan);
router.get("/monthly", getMonthlyAttendance);

export default router;
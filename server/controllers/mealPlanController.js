import MealPlan from "../models/MealPlan.js";

const isLocked = (date) => {
  const today = new Date();
  const mealDate = new Date(date);
  // today.setDate(today.getDate() - 2);

  today.setHours(0, 0, 0, 0);
  mealDate.setHours(0, 0, 0, 0);

  mealDate.setDate(mealDate.getDate() - 1);

  return today >= mealDate;
};

// SET PLAN
export const setMealPlan = async (req, res) => {
  try {
    const { userId, date, meal, status } = req.body;

    // console.log("BODY:", req.body);
    // console.log("LOCK CHECK:", date, isLocked(date));

    const locked = isLocked(date);

    const meals = ["breakfast", "lunch", "dinner"];

    for (const m of meals) {
      const existing = await MealPlan.findOne({ userId, date, meal: m });

      const finalStatus = m === meal ? status : existing?.status || "skip";

      await MealPlan.findOneAndUpdate(
        { userId, date, meal: m },
        { status: finalStatus, locked },
        { upsert: true, new: true },
      );
    }

    res.json({ message: "Meal plan finalized for the day" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating meal plan" });
  }
};

// GET PLAN
export const getMyMealPlan = async (req, res) => {
  try {
    const { userId } = req.query;

    const plans = await MealPlan.find({ userId });

    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plans" });
  }
};

export const getMonthlyAttendance = async (req, res) => {
  try {
    const { userId, month } = req.query; // month = "2026-04"

    const plans = await MealPlan.find({
      userId,
      date: { $regex: `^${month}` },
    });

    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

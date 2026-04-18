import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    meal: {
      type: String,
      enum: ["breakfast", "lunch", "dinner"],
      required: true,
    },

    status: {
      type: String,
      enum: ["eat", "skip"],
      default: "eat",
    },

    locked: {
      type: Boolean,
      default: false,
    },

    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true },
);

mealPlanSchema.index({ userId: 1, date: 1, meal: 1 }, { unique: true });
mealPlanSchema.index({ date: 1, meal: 1, messId: 1 });

export default mongoose.model("MealPlan", mealPlanSchema);

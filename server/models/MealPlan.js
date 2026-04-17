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
  },
  { timestamps: true }
);

mealPlanSchema.index({ userId: 1, date: 1, meal: 1 }, { unique: true });


export default mongoose.model("MealPlan", mealPlanSchema);


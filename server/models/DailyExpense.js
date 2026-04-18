import mongoose from "mongoose";

const dailyExpenseSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    breakfastCost: {
      type: Number,
      default: 0,
    },

    lunchCost: {
      type: Number,
      default: 0,
    },

    dinnerCost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

dailyExpenseSchema.index({ messId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyExpense", dailyExpenseSchema);
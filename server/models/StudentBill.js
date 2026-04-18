import mongoose from "mongoose";

const studentBillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    date: {
      type: String,
    },

    breakfast: Number,
    lunch: Number,
    dinner: Number,

    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model("StudentBill", studentBillSchema);
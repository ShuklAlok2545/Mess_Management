import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    category: {
      type: String,
      enum: ["Food Quality", "Mess Staff", "Hygiene", "Service Delay", "Other"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD (from frontend)
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    reply: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    breakfast: {
      type: String,
      default: "",
    },
    lunch: {
      type: String,
      default: "",
    },
    dinner: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Menu", menuSchema);

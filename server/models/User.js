import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    authProvider: {
      type: String,
      default: "local", // or "google"
    },
    name: String,
    photo: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otpExpires: Date,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

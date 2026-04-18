import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    hostelName: String,
    enrolmentNumber: {
      type: String,
      unique: true,
    },
    roomNumber: String,
    phone: String,

    authProvider: {
      type: String,
      default: "local",
    },

    otp: String,
    otpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
const tempUsers = {};
import Admin from "../models/Admin.js";

// 🔢 Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 🟢 Signup
export const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      hostelName,
      enrolmentNumber,
      roomNumber,
      phone,
      messCode,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (tempUsers[email]) {
      const otp = generateOTP();
      tempUsers[email].otp = otp;
      tempUsers[email].otpExpiry = Date.now() + 5 * 60 * 1000;

      await sendOTPEmail(email, otp);
      return res.json({ message: "OTP resent to email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    tempUsers[email] = {
      fullName,
      email,
      hostelName,
      enrolmentNumber,
      roomNumber,
      phone,
      password: hashedPassword,
      messCode,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    };

    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      return res.status(500).json({
        message: "Failed to send OTP email",
        error: emailError.message,
      });
    }

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔵 Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tempUser = tempUsers[email];

    if (!tempUser) {
      return res.status(400).json({ message: "No signup request found" });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (tempUser.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const admin = await Admin.findOne({
      messCode: tempUser.messCode,
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid Mess Code" });
    }

    const newUser = await User.create({
      fullName: tempUser.fullName,
      email: tempUser.email,
      hostelName: tempUser.hostelName,
      enrolmentNumber: tempUser.enrolmentNumber,
      roomNumber: tempUser.roomNumber,
      phone: tempUser.phone,
      password: tempUser.password,
      isVerified: true,
      messId: admin._id,
    });

    delete tempUsers[email];
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userData = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      hostelName: newUser.hostelName,
      enrolmentNumber: newUser.enrolmentNumber,
      roomNumber: newUser.roomNumber,
      phone: newUser.phone,
      messId: newUser.messId,
    };

    res.json({
      message: "OTP verified successfully",
      token,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔐 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      hostelName: user.hostelName,
      enrolmentNumber: user.enrolmentNumber,
      roomNumber: user.roomNumber,
      phone: user.phone,
      messId: user.messId,
    };

    res.json({
      token,
      user: userData,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "User not verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select(
      "fullName email hostelName enrolmentNumber roomNumber phone messId",
    );

    res.json(user);
  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

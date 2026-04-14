import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import admin from "../config/firebaseAdmin.js";

// 🔢 Generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 🟢 Signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    user = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 min
    });

    await user.save();

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

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "OTP verified successfully",
      token,
      user,
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const googleAuth = async (req, res) => {
  console.log("Google Auth API HIT"); // debug

  try {
    const { token } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);

    const { email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        photo: picture,
        password: "google_auth",
        authProvider: "google",
        isVerified: true,
      });
      await user.save();
    } else {
      if (!user.name || !user.photo) {
        user.name = name;
        user.photo = picture;
        await user.save();
      }
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};

import Admin from "../models/Admin.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import MealPlan from "../models/MealPlan.js";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

const otpStore = new Map();

/* =========================
   SEND OTP
========================= */
export const sendAdminOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    otpStore.set(email, otp);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ✅ FIXED
        pass: process.env.EMAIL_PASS, // ✅ FIXED
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Admin Signup OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.log("OTP ERROR:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

/* =========================
   VERIFY OTP + SIGNUP
========================= */
export const verifyAdminOtpAndSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      messName,
      phoneNumber,
      messAddress,
      otp,
    } = req.body;

    const storedOtp = otpStore.get(email);

    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate messCode
    const messCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const admin = await Admin.create({
      fullName,
      email,
      password: hashedPassword,
      messName,
      phoneNumber,
      messAddress,
      messCode,
    });

    otpStore.delete(email);

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      admin: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        messName: admin.messName,
        messCode: admin.messCode,
      },
    });
  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Signup error" });
  }
};

/* =========================
   LOGIN
========================= */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      admin: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        messName: admin.messName,
        messCode: admin.messCode,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login error" });
  }
};

/* =========================
   TOMORROW MEAL COUNT (FILTERED)
========================= */
export const getMealCount = async (req, res) => {
  try {
    const messId = req.user.id;
    const students = await User.find({ messId });
    const studentIds = students.map((s) => s._id);

    const today = new Date().toISOString().split("T")[0];

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    const todayMeals = await MealPlan.find({
      userId: { $in: studentIds },
      date: today,
    });

    const tomorrowMeals = await MealPlan.find({
      userId: { $in: studentIds },
      date: tomorrow,
    });

    const countMeals = (meals) => {
      return {
        breakfast: meals.filter(
          (m) => m.meal === "breakfast" && m.status === "eat",
        ).length,
        lunch: meals.filter((m) => m.meal === "lunch" && m.status === "eat")
          .length,
        dinner: meals.filter((m) => m.meal === "dinner" && m.status === "eat")
          .length,
      };
    };

    res.json({
      today: countMeals(todayMeals),
      tomorrow: countMeals(tomorrowMeals),
    });
  } catch (err) {
    console.log("MEAL COUNT ERROR:", err);
    res.status(500).json({ message: "Error fetching meal count" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = await Admin.findById(adminId).select(
      "fullName email messName messCode phoneNumber messAddress",
    );

    res.json(admin);
  } catch (err) {
    console.log("GET ADMIN ERROR:", err);
    res.status(500).json({ message: "Error fetching admin details" });
  }
};

export const getStudentsByAdmin = async (req, res) => {
  try {
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const students = await User.find({ messId: adminId }).select(
      "fullName email hostelName roomNumber enrolmentNumber phone",
    );

    res.json(students);
  } catch (err) {
    console.log("GET STUDENTS ERROR:", err);
    res.status(500).json({ message: "Error fetching students" });
  }
};

export const getTodayReport = async (req, res) => {
  try {
    const adminId = req.user.id;

    const today = new Date().toISOString().split("T")[0];

    const PRICES = {
      breakfast: 30,
      lunch: 50,
      dinner: 40,
    };

    const students = await User.find({ messId: adminId });

    const report = [];

    for (const student of students) {
      const meals = await MealPlan.find({
        userId: student._id,
        date: today,
      });

      let data = {
        _id: student._id,
        name: student.fullName,
        enrolment: student.enrolmentNumber,
        breakfast: "skip",
        lunch: "skip",
        dinner: "skip",
        total: 0,
      };

      meals.forEach((m) => {
        data[m.meal] = m.status;

        if (m.status === "eat") {
          data.total += PRICES[m.meal];
        }
      });

      report.push(data);
    }

    res.json(report);
  } catch (err) {
    console.log("REPORT ERROR:", err);
    res.status(500).json({ message: "Error generating report" });
  }
};

export const getStudentHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month } = req.query;
    const today = new Date().toISOString().split("T")[0];

    let filter = { userId: studentId };

    if (month) {
      filter.date = { $regex: `^${month}` };
    }
    console.log("Filter:", filter);

    const meals = await MealPlan.find(filter);

    const lockedMeals = meals.filter((m) => m.date < today);

    const student = await User.findById(studentId).select(
      "fullName enrolmentNumber",
    );

    const grouped = {};

    const PRICES = {
      breakfast: 30,
      lunch: 50,
      dinner: 40,
    };

    lockedMeals.forEach((m) => {
      const date =
        typeof m.date === "string"
          ? m.date
          : new Date(m.date).toISOString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = {
          date,
          name: student.fullName,
          enrolment: student.enrolmentNumber,
          breakfast: "skip",
          lunch: "skip",
          dinner: "skip",
          total: 0,
        };
      }

      grouped[date][m.meal] = m.status;

      if (m.status === "eat") {
        grouped[date].total += PRICES[m.meal];
      }
    });

    const result = Object.values(grouped);

    res.json(result);
  } catch (err) {
    console.log("STUDENT HISTORY ERROR:", err);
    res.status(500).json({ message: "Error fetching history" });
  }
};

export const downloadStudentHistoryPDF = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month } = req.query;

    let filter = { userId: studentId };

    if (month) {
      filter.date = { $regex: `^${month}` };
    }

    const meals = await MealPlan.find(filter);
    const today = new Date().toISOString().split("T")[0];
    const lockedMeals = meals.filter((m) => m.date < today);

    const student = await User.findById(studentId).select(
      "fullName enrolmentNumber",
    );

    const grouped = {};

    const PRICES = {
      breakfast: 30,
      lunch: 50,
      dinner: 40,
    };

    lockedMeals.forEach((m) => {
      const date = m.date;

      if (!grouped[date]) {
        grouped[date] = {
          date,
          breakfast: "skip",
          lunch: "skip",
          dinner: "skip",
          total: 0,
        };
      }

      grouped[date][m.meal] = m.status;

      if (m.status === "eat") {
        grouped[date].total += PRICES[m.meal];
      }
    });

    const data = Object.values(grouped);

    // 📄 Create PDF
    const doc = new PDFDocument();
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Student-${student.fullName}-${month}.pdf`,
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Title
    doc.fontSize(18).text("Student Meal Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Name: ${student.fullName}`);
    doc.text(`Enrollment: ${student.enrolmentNumber}`);
    doc.text(`Month: ${month}`);
    doc.moveDown();

    let grandTotal = 0;

    data.forEach((d) => {
      doc.text(
        `${d.date} | B: ${d.breakfast} | L: ${d.lunch} | D: ${d.dinner} | ₹${d.total}`,
      );
      grandTotal += d.total;
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Bill: ₹${grandTotal}`);

    doc.end();
  } catch (err) {
    console.log("PDF ERROR:", err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

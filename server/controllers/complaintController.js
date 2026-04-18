import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

export const createComplaint = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    const { category, title, description, date } = req.body;

    const complaint = await Complaint.create({
      userId,
      messId: user.messId,
      category,
      title,
      description,
      date,
    });

    res.status(201).json({
      message: "Complaint submitted",
      complaint,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating complaint" });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const userId = req.user.id;

    const complaints = await Complaint.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const adminId = req.user.id;

    const complaints = await Complaint.find({ messId: adminId })
      .populate("userId", "fullName enrolmentNumber")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status, reply },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating complaint" });
  }
};
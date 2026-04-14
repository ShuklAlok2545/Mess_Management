import StudentLayout from "../../layouts/StudentLayout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const today = new Date()
  .toLocaleString("en-US", { weekday: "long" })
  .toLowerCase();
  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
        <div
          onClick={() => navigate(`/student/menu/${today}`)}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-lg font-semibold">🍽️ Today's Menu</h2>
          <p className="text-gray-500 mt-2">View today's meals</p>
        </div>

        <div
          onClick={() => navigate("/student/attendance")}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-lg font-semibold">📸 Attendance</h2>
          <p className="text-gray-500 mt-2">View your attendance</p>
        </div>

        <div
          onClick={() => navigate("/student/feedback")}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h2 className="text-lg font-semibold">⭐ Feedback</h2>
          <p className="text-gray-500 mt-2">Rate your meals</p>
        </div>
      </div>
    </StudentLayout>
  );
}

import StudentLayout from "../../layouts/StudentLayout";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const menu = {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Rice", "Dal", "Paneer", "Roti"],
    dinner: ["Chapati", "Sabzi", "Salad"],
  };

  const Card = ({ title, emoji, items }) => (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-4">
        {emoji} {title}
      </h2>

      <ul className="space-y-2 text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-green-500">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">🍽️ Weekly Menu</h1>

      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Day</th>
              <th className="p-3">Breakfast</th>
              <th className="p-3">Lunch</th>
              <th className="p-3">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <tr
                key={day}
                onClick={() => navigate(`/student/menu/${day.toLowerCase()}`)}
                className="border-t hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-3 font-medium">{day}</td>
                <td className="p-3">Poha, Tea</td>
                <td className="p-3">Rice, Dal</td>
                <td className="p-3">Roti, Sabzi</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StudentLayout>
  );
}

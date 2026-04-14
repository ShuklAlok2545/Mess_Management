import StudentLayout from "../../layouts/StudentLayout";
import { useParams } from "react-router-dom";

export default function TodayMenu() {
  const { day } = useParams();
  const todayMenu = {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Rice", "Dal", "Paneer", "Roti"],
    dinner: ["Chapati", "Sabzi", "Salad"],
  };

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">
        🍽️ {day ? day.toUpperCase() : "Today's"} Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Breakfast */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">🍳 Breakfast</h2>
          <ul className="space-y-2 text-gray-600">
            {todayMenu.breakfast.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Lunch */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">🍛 Lunch</h2>
          <ul className="space-y-2 text-gray-600">
            {todayMenu.lunch.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Dinner */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">🌙 Dinner</h2>
          <ul className="space-y-2 text-gray-600">
            {todayMenu.dinner.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </StudentLayout>
  );
}

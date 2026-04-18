import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Students", path: "/admin/students", icon: "👨‍🎓" },
    { name: "Reports", path: "/admin/reports", icon: "📅" },
    { name: "Plan Menu", path: "/admin/meal-plans", icon:"💰" },
    { name: "Feedbacks", path: "/admin/feedbacks", icon: "📢" },
    { name: "Complaints", path: "/admin/complaints", icon: "📢" },
    { name: "Admin Details", path: "/admin/details", icon: "👤" },
    { name: "Set Expense", path: "/admin/set-expense", icon:"💰" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 p-5 flex flex-col text-gray-200">
      <h2 className="text-xl font-semibold mb-8 text-white">
        🍽 Mess Admin
      </h2>

      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              location.pathname === item.path
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800 text-gray-400"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto text-red-400 hover:text-red-300 text-sm"
      >
        Logout
      </button>
    </div>
  );
}
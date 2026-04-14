import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUtensils, FaStar, FaExclamationCircle } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: <FaHome /> },
    { name: "Menu", path: "/student/menu", icon: <FaUtensils /> },
    { name: "Feedback", path: "/student/feedback", icon: <FaStar /> },
    { name: "Complaints", path: "/student/complaints", icon: <FaExclamationCircle /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">SmartMess</h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-lg transition 
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
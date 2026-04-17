import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUtensils, FaStar, FaExclamationCircle ,FaUser} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: <FaHome /> },
    { name: "Menu", path: "/student/menu", icon: <FaUtensils /> },
    { name: "Feedback", path: "/student/feedback", icon: <FaStar /> },
    { name: "Complaints", path: "/student/complaints", icon: <FaExclamationCircle /> },
    { name: "Student Details", path: "/student/details", icon: <FaUser /> },
  ];

  return (
    
    <div className="h-screen w-64 bg-gray-950 border-r border-gray-800 p-5 flex flex-col text-gray-200">
      <h2 className="text-2xl font-bold mb-8">SmartMess</h2>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800 text-gray-400"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="mt-auto text-red-400 hover:text-red-300 text-sm"
      >
        Logout
      </button>
    </div>
  );
}
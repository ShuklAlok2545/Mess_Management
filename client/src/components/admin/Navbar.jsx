import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Complaints", path: "/admin/complaints" },
    { name: "Admin Details", path: "/admin/details" },
  ];

  const currentPage =
    menu.find((m) => m.path === location.pathname)?.name || "Dashboard";

  return (
    <div className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      <h1 className="text-lg font-semibold text-white">
        {currentPage}
      </h1>

      <div className="text-sm text-gray-400">
        {admin?.fullName}
      </div>
    </div>
  );
}
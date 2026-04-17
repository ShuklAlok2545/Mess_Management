// import { useNavigate, useLocation } from "react-router-dom";

// export default function AdminLayout({ children }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
//     { name: "Students", path: "/admin/students", icon: "👨‍🎓" },
//     { name: "Reports", path: "/admin/reports", icon: "📅" },
//     { name: "Complaints", path: "/admin/complaints", icon: "📢" },
//     { name: "Admin Details", path: "/admin/details", icon: "📢" },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/admin/login");
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
//       {/* Sidebar */}
//       <div className="w-64 bg-white/70 backdrop-blur-lg shadow-lg p-6 flex flex-col">
//         <h2 className="text-2xl font-bold mb-8">🍽 Mess Admin</h2>

//         <div className="flex flex-col gap-3">
//           {menu.map((item) => (
//             <button
//               key={item.path}
//               onClick={() => navigate(item.path)}
//               className={`text-left px-4 py-3 rounded-lg transition ${
//                 location.pathname === item.path
//                   ? "bg-purple-500 text-white shadow"
//                   : "hover:bg-gray-200"
//               }`}
//             >
//               {item.icon} {item.name}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={handleLogout}
//           className="mt-auto text-red-500 font-semibold"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main */}
//       <div className="flex-1 p-8 overflow-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">
//             Welcome, {admin?.fullName}
//           </h1>
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// }


import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
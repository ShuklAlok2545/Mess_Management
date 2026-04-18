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
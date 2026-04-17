import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("http://localhost:4000/api/admin/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">👨‍🎓 Students</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Hostel</th>
              <th>Room</th>
              <th>Enrollment</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s._id}
                className="border-t hover:bg-purple-50 cursor-pointer"
                onClick={() => navigate(`/admin/student/${s._id}`)}
              >
                <td className="p-4 font-semibold">{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.hostelName}</td>
                <td>{s.roomNumber}</td>
                <td>{s.enrolmentNumber}</td>
                <td>{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
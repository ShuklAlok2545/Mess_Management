import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

export default function StudentDetailsAdmin() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      setStudent(data.find((s) => s._id === id));
    };

    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">👤 Student Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6">
        <div><b>Name:</b> {student.fullName}</div>
        <div><b>Email:</b> {student.email}</div>
        <div><b>Hostel:</b> {student.hostelName}</div>
        <div><b>Room:</b> {student.roomNumber}</div>
        <div><b>Enrollment:</b> {student.enrolmentNumber}</div>
        <div><b>Phone:</b> {student.phone}</div>
      </div>
    </AdminLayout>
  );
}
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const [report, setReport] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      const res = await fetch("http://localhost:4000/api/admin/report/today", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      setReport(data);
    };

    fetchReport();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">📅 Today's Report</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th>Enroll</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {report.map((r, i) => (
              <tr
                key={i}
                className="border-t hover:bg-purple-50 cursor-pointer"
                onClick={() => navigate(`/admin/history/${r._id}`)}
              >
                <td className="p-4 font-semibold">{r.name}</td>
                <td>{r.enrolment}</td>
                <td className="text-center">{r.breakfast}</td>
                <td className="text-center">{r.lunch}</td>
                <td className="text-center">{r.dinner}</td>
                <td className="text-center font-bold">₹{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
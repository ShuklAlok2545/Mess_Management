import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function ComplaintsAdmin() {
  const [complaints, setComplaints] = useState([]);
  const [updates, setUpdates] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/complaint/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setComplaints(data);
    };

    fetchComplaints();
  }, []);

  const handleChange = (id, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaint/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates[id]),
        }
      );

      const updated = await res.json();

      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? updated : c))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">🚨 Complaints</h1>

      {complaints.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded-lg shadow mb-4">

          <p className="font-bold">
            {item.userId.fullName} ({item.userId.enrolmentNumber})
          </p>

          <p className="text-sm text-gray-500">
            {item.category} • {item.date}
          </p>

          <p className="mt-2 font-medium">{item.title}</p>
          <p className="text-gray-600">{item.description}</p>

          <select
            value={updates[item._id]?.status || item.status}
            onChange={(e) =>
              handleChange(item._id, "status", e.target.value)
            }
            className="mt-3 border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <textarea
            placeholder="Write reply..."
            value={updates[item._id]?.reply || item.reply}
            onChange={(e) =>
              handleChange(item._id, "reply", e.target.value)
            }
            className="w-full border p-2 rounded mt-2"
          />

          <button
            onClick={() => handleUpdate(item._id)}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      ))}
    </AdminLayout>
  );
}
import { useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";

export default function Complaints() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Food Quality");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [showContacts, setShowContacts] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill all fields before submitting.");
      return;
    }

    console.log({ type, title, description, date });

    alert("Complaint submitted!");

    setType("Food Quality");
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">🚨 Complaints</h1>
          <p className="text-gray-500">
            Report issues related to mess services
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow space-y-5 border">
          {/* Complaint Type */}
          <div>
            <p className="font-medium mb-2">Complaint Type</p>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-red-500"
            >
              <option>Food Quality</option>
              <option>Mess Staff</option>
              <option>Hygiene</option>
              <option>Service Delay</option>
              <option>Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <p className="font-medium mb-2">Date</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Title */}
          <div>
            <p className="font-medium mb-2">Title</p>
            <input
              type="text"
              placeholder="Enter complaint title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <p className="font-medium mb-2">Description</p>
            <textarea
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:border-red-500"
              rows="4"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition font-medium"
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

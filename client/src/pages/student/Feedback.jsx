import { useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const [meal, setMeal] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!meal || rating === 0 || !message.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("studentToken");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "feedback",
          message: `${meal} | ${rating}⭐ | ${message}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Feedback submitted!");

      setMeal("");
      setRating(0);
      setMessage("");
    } catch (err) {
      console.log(err);
      alert("Error submitting feedback");
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-2xl mx-auto px-4">
        {/* 🔥 Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">⭐ Feedback</h1>
            <p className="text-gray-500 text-sm">
              Share your experience about today's meals
            </p>
          </div>

          {/* Premium Button */}
          <button
            onClick={() => navigate("/student/my-feedbacks")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            📜 History
          </button>
        </div>

        {/* 🔥 Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border space-y-6">
          {/* Meal Selection */}
          <div>
            <p className="font-medium mb-2 text-gray-700">Select Meal</p>
            <div className="flex gap-3">
              {["Breakfast", "Lunch", "Dinner"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMeal(item)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    meal === item
                      ? "bg-blue-600 text-white shadow"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="font-medium mb-2 text-gray-700">Rate your meal</p>
            <div className="flex gap-2 text-3xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={`transition ${
                    (hover || rating) >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="font-medium mb-2 text-gray-700">Comments</p>
            <textarea
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all font-medium"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

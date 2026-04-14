import { useState, useEffect } from "react";
import StudentLayout from "../../layouts/StudentLayout";

export default function Feedback() {
  const getTodayDay = () =>
    new Date().toLocaleString("en-US", { weekday: "long" });

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [day, setDay] = useState(getTodayDay());
  const [meal, setMeal] = useState("");

  useEffect(() => {
    setDay(getTodayDay());
  }, []);

  const handleSubmit = () => {
    if (!meal || rating === 0) {
      alert("Please select meal and rating before submitting.");
      return;
    }

    console.log({ day, meal, rating, comment });

    setDay(getTodayDay());
    setMeal("");
    setRating(0);
    setComment("");

    alert("Feedback submitted!");
  };

  return (
    <StudentLayout>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">⭐ Feedback</h1>
          <p className="text-gray-500">Tell us about your meal experience</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow space-y-6">
          {/* Day Selection */}
          <div>
            <p className="font-medium mb-2">Select Day</p>
            <select
              value={day}
              disabled
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            <p className="text-sm text-gray-400 mt-1">
              Auto-selected based on today
            </p>
          </div>

          {/* Meal Selection */}
          <div>
            <p className="font-medium mb-2">Select Meal</p>
            <div className="flex gap-4">
              {["Breakfast", "Lunch", "Dinner"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMeal(item)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    meal === item
                      ? "bg-blue-600 text-white"
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
            <p className="font-medium mb-2">Rate your meal</p>
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

          {/* Comment */}
          <div>
            <p className="font-medium mb-2">Additional Comments</p>
            <textarea
              placeholder="Optional: tell us more..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={!meal || rating === 0}
            className={`w-full py-3 rounded-lg font-medium transition ${
              !meal || rating === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}

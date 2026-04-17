import StudentLayout from "../../layouts/StudentLayout";
import { useState, useEffect } from "react";

export default function Menu() {
  const getInitialPlans = () => {
    const initial = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      const date = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
      ).toLocaleDateString("en-CA");

      ["breakfast", "lunch", "dinner"].forEach((meal) => {
        const key = `${date}-${meal}`;
        initial[key] = "eat"; // 🔥 default
      });
    }

    return initial;
  };

  const [plans, setPlans] = useState(getInitialPlans());
  const [savedKeys, setSavedKeys] = useState(new Set());
  const storedUser = localStorage.getItem("user");
  const [isLoaded, setIsLoaded] = useState(false);

  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchPlans = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(
          `http://localhost:4000/api/meal/my?userId=${user._id}`,
        );
        const data = await res.json();

        const formatted = {};
        data.forEach((plan) => {
          const key = `${plan.date}-${plan.meal}`;
          formatted[key] = plan.status;
        });

        setPlans((prev) => ({
          ...prev,
          ...formatted,
        }));

        setIsLoaded(true);
      } catch (err) {
        console.log("Error loading plans", err);
      }
    };

    fetchPlans();
  }, []);

  const menu = {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Rice", "Dal", "Paneer", "Roti"],
    dinner: ["Chapati", "Sabzi", "Salad"],
  };

  const isLocked = (date) => {
    const today = new Date();
    const mealDate = new Date(date);
    // today.setDate(today.getDate() - 2);

    today.setHours(0, 0, 0, 0);
    mealDate.setHours(0, 0, 0, 0);

    mealDate.setDate(mealDate.getDate() - 1);

    return today >= mealDate;
  };

  const toggleMeal = (date, meal) => {
    if (isLocked(date)) return;

    const key = `${date}-${meal}`;
    const newStatus = plans[key] === "eat" ? "skip" : "eat";

    setPlans({
      ...plans,
      [key]: newStatus,
    });
  };

  useEffect(() => {
    if (!user?._id || !isLoaded) return;

    const savePlans = async () => {
      try {
        const requests = [];

        for (const key in plans) {
          const parts = key.split("-");
          const meal = parts.pop();
          const date = parts.join("-");

          requests.push(
            fetch("http://localhost:4000/api/meal/set", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user._id,
                date,
                meal,
                status: plans[key],
              }),
            }),
          );
        }

        await Promise.all(requests);
      } catch (err) {
        console.log("Error saving plans", err);
      }
    };

    savePlans();
  }, [plans]);

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">🍽️ Weekly Menu</h1>

      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Day</th>
              <th className="p-3">Breakfast</th>
              <th className="p-3">Lunch</th>
              <th className="p-3">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() + i); // start from today

              const item = {
                day: d.toLocaleDateString("en-US", { weekday: "long" }),
                date: new Date(
                  d.getFullYear(),
                  d.getMonth(),
                  d.getDate(),
                ).toLocaleDateString("en-CA"),
                displayDate: d.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                }),
              };

              return (
                <tr key={item.date} className="border-t hover:bg-gray-100">
                  <td className="p-3 font-medium">
                    <div>{item.day}</div>
                    <div className="text-sm text-gray-500">
                      {item.displayDate}
                    </div>
                  </td>

                  <td className="p-3">
                    <div
                      className={`flex items-center justify-between ${
                        isLocked(item.date)
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMeal(item.date, "breakfast");
                      }}
                    >
                      <div>
                        <span>{menu.breakfast.join(", ")}</span>
                        <div className="text-xs text-gray-400">
                          {item.displayDate}
                        </div>
                      </div>

                      <span className="text-lg">
                        {plans[`${item.date}-breakfast`] === "skip"
                          ? "❌"
                          : "✅"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div
                      className={`flex items-center justify-between ${
                        isLocked(item.date)
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMeal(item.date, "lunch");
                      }}
                    >
                      <div>
                        <span>{menu.lunch.join(", ")}</span>
                        <div className="text-xs text-gray-400">
                          {item.displayDate}
                        </div>
                      </div>

                      <span className="text-lg">
                        {plans[`${item.date}-lunch`] === "skip" ? "❌" : "✅"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div
                      className={`flex items-center justify-between ${
                        isLocked(item.date)
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMeal(item.date, "dinner");
                      }}
                    >
                      <div>
                        <span>{menu.dinner.join(", ")}</span>
                        <div className="text-xs text-gray-400">
                          {item.displayDate}
                        </div>
                      </div>

                      <span className="text-lg">
                        {plans[`${item.date}-dinner`] === "skip" ? "❌" : "✅"}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </StudentLayout>
  );
}

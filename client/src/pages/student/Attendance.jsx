import StudentLayout from "../../layouts/StudentLayout";
import { useEffect, useState } from "react";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const prices = {
    breakfast: 30,
    lunch: 50,
    dinner: 40,
  };

  const [bill, setBill] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    total: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user =
      storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

    if (!user?._id) return;

    const fetchAttendance = async () => {
      try {
        const monthString = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}`;

        const res = await fetch(
          `http://localhost:4000/api/meal/monthly?userId=${user._id}&month=${monthString}`
        );

        const data = await res.json();

        const daysMap = {};

        const daysInMonth = new Date(
          selectedYear,
          selectedMonth + 1,
          0
        ).getDate();

        data.forEach((item) => {
          const day = parseInt(item.date.split("-")[2]);

          if (!daysMap[day]) {
            daysMap[day] = {
              day,
              breakfast: false,
              lunch: false,
              dinner: false,
            };
          }

          daysMap[day][item.meal] = item.status === "eat";
        });

        const fullMonth = [];
        const today = new Date();

        const isCurrentMonth =
          selectedMonth === today.getMonth() &&
          selectedYear === today.getFullYear();

        for (let day = 1; day <= daysInMonth; day++) {
          const isFuture = isCurrentMonth && day > today.getDate();

          fullMonth.push({
            day,
            isFuture, // 👈 store it here
            breakfast: !isFuture && (daysMap[day]?.breakfast || false),
            lunch: !isFuture && (daysMap[day]?.lunch || false),
            dinner: !isFuture && (daysMap[day]?.dinner || false),
          });
        }

        // 💰 BILL CALCULATION
        let breakfastCount = 0;
        let lunchCount = 0;
        let dinnerCount = 0;

        fullMonth.forEach((day) => {
          if (day.breakfast) breakfastCount++;
          if (day.lunch) lunchCount++;
          if (day.dinner) dinnerCount++;
        });

        const breakfastTotal = breakfastCount * prices.breakfast;
        const lunchTotal = lunchCount * prices.lunch;
        const dinnerTotal = dinnerCount * prices.dinner;

        setBill({
          breakfast: breakfastTotal,
          lunch: lunchTotal,
          dinner: dinnerTotal,
          total: breakfastTotal + lunchTotal + dinnerTotal,
        });

        setAttendance(fullMonth);
      } catch (err) {
        console.log("Error fetching attendance", err);
      }
    };

    fetchAttendance();
  }, [selectedMonth, selectedYear]);

  return (
    <StudentLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          📊 Monthly Attendance ({months[selectedMonth]} {selectedYear})
        </h1>

        <div className="flex gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>

          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          Breakfast
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          Lunch
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          Dinner
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <div className="flex items-end gap-5 h-64">
          {attendance.map((item) => (
            <div key={item.day} className="flex flex-col items-center">
              
              {/* Bars */}
              <div className="flex flex-col-reverse items-center gap-0">
                {item.breakfast && (
                  <div className="w-1 h-6 bg-red-500 rounded"></div>
                )}
                {item.lunch && (
                  <div className="w-1 h-6 bg-yellow-400 rounded"></div>
                )}
                {item.dinner && (
                  <div className="w-1 h-6 bg-green-500 rounded"></div>
                )}
              </div>

              {/* Day */}
              <span
                className={`mt-2 text-sm ${
                  item.isFuture ? "text-gray-300" : ""
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bill */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">💰 Monthly Bill</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Breakfast: ₹{bill.breakfast}</div>
          <div>Lunch: ₹{bill.lunch}</div>
          <div>Dinner: ₹{bill.dinner}</div>

          <div className="col-span-2 font-bold text-lg mt-2">
            Total: ₹{bill.total}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
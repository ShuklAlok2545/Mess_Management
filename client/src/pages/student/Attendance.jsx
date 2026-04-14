import StudentLayout from "../../layouts/StudentLayout";

export default function Attendance() {
  const attendance = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    breakfast: Math.random() > 0.3,
    lunch: Math.random() > 0.3,
    dinner: Math.random() > 0.3,
  }));

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">
        📊 Monthly Attendance (April)
      </h1>

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

      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <div className="flex items-end gap-5 h-64">
          {attendance.map((item) => (
            <div key={item.day} className="flex flex-col items-center">
              
              {/* Stack */}
              <div className="flex flex-col-reverse items-center gap-0">
                
                {/* Breakfast (bottom) */}
                {item.breakfast && (
                  <div title="Breakfast" className="w-1 h-6 bg-red-500 rounded"></div>
                )}

                {/* Lunch */}
                {item.lunch && (
                  <div title="Lunch" className="w-1 h-6 bg-yellow-400 rounded"></div>
                )}

                {/* Dinner (top) */}
                {item.dinner && (
                  <div title="Dinner" className="w-1 h-6 bg-green-500 rounded"></div>
                )}
              </div>

              {/* Day Label */}
              <span className="mt-2 text-sm">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
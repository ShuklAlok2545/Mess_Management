import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        {user?.photo && (
          <img
            src={user.photo}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        )}

        <span className="text-gray-700 font-medium">
          {user?.name || user?.email || "User"}
        </span>
      </div>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
>
  Logout
</button>
    </div>
  );
}

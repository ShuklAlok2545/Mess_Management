import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full flex justify-between items-center px-10 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-green-600">🍽️ SmartMess</h1>

        <div className="flex gap-6 items-center">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-black"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Sign Up Free
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <h1 className="text-5xl font-bold leading-tight">
          Know What's Cooking <br />
          <span className="text-green-500">Before You Go!</span>
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl">
          Check daily menus, rate meals, and improve your mess experience.
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </button>

          <button className="border px-6 py-3 rounded-lg">
            See How It Works
          </button>
        </div>
      </div>
    </div>
  );
}

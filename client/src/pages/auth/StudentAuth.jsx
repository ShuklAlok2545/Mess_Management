import { useNavigate } from "react-router-dom";

export default function StudentAuth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center">
        <h2 className="text-2xl font-bold mb-2">Student Access</h2>
        <p className="text-gray-500 mb-6">
          Login or create a new account
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg mb-3 w-full"
        >
          Signup
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg w-full"
        >
          Signin
        </button>
      </div>
    </div>
  );
}
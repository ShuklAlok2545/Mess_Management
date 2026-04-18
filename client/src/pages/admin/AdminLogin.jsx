import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ FIXED HERE
      localStorage.setItem("admin", JSON.stringify(data.admin));
      localStorage.setItem("adminToken", data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">👨‍💼 Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p
          className="text-sm text-blue-600 cursor-pointer mt-2 text-center"
          onClick={() => navigate("/admin/forgot-password")}
        >
          Forgot Password?
        </p>
        <p className="text-sm mt-4 text-center">
          New admin?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/admin/signup")}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}

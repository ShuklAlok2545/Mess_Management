import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      navigate("/admin/reset-password", { state: { email } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Admin Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}
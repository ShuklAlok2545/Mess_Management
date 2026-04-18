import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminResetPassword() {
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
    if (!email) {
        alert("Session expired. Please try again.");
        navigate("/admin/forgot-password");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword }),
        },
      );

      const data = await res.json();
      

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Password updated successfully");
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="email"
          value={email}
          disabled
          className="w-full p-2 border mb-3 rounded bg-gray-100"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

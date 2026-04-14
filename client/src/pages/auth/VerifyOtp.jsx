import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("otpEmail");

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      alert(data.message || "OTP verified successfully");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/student/dashboard";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white shadow-lg p-6 rounded-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

        <p className="text-sm text-gray-500 mb-3">OTP sent to {email}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-2 mb-3 rounded text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
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

      alert("OTP sent to your email");

      navigate("/reset-password", { state: { email } });

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center">

        <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
        <p className="text-gray-500 mb-4">
          Enter your email to receive OTP
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg w-full"
        >
          Send OTP
        </button>

        <p
          className="text-sm text-blue-600 mt-4 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>

      </div>
    </div>
  );
}
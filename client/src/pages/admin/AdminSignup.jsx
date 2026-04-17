import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    messName: "",
    phoneNumber: "",
    messAddress: "",
    otp: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    const res = await fetch("http://localhost:4000/api/admin/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form.email }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("OTP sent");
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:4000/api/admin/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful");
    localStorage.setItem("admin", JSON.stringify(data.admin));
    localStorage.setItem("adminToken", data.token);
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">👨‍💼 Admin Signup</h1>

        {step === 1 && (
          <>
            <input
              name="fullName"
              placeholder="Full Name"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <input
              name="messName"
              placeholder="Mess Name"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <input
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <input
              name="messAddress"
              placeholder="Mess Address"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <button
              onClick={sendOtp}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="otp"
              placeholder="Enter OTP"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Verify & Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}

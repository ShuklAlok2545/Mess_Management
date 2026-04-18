import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledMessCode = location.state?.messCode || "";
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    hostelName: "",
    messCode: prefilledMessCode,
    enrolmentNumber: "",
    roomNumber: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const {
      fullName,
      email,
      hostelName,
      messCode,
      enrolmentNumber,
      roomNumber,
      phone,
      password,
      confirmPassword,
    } = form;

    if (!fullName || !email || !password) {
      alert("Fill all required fields");
      return;
    }
    if (!hostelName || !messCode || !enrolmentNumber || !roomNumber || !phone) {
      alert("Fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert(data.message);

      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      console.log(err);
    }
  };

  const validateStep1 = () => {
    if (!form.fullName || !form.email) {
      alert("Please fill all fields");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { hostelName, messCode, enrolmentNumber, roomNumber, phone } = form;

    if (!hostelName || !messCode || !enrolmentNumber || !roomNumber || !phone) {
      alert("Please fill all details");
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-gray-500 text-center mb-4">Sign up to get started</p>
        <div className="flex justify-center items-center gap-4 mb-6 mt-4">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 1 ? "bg-purple-500 text-white" : "bg-gray-300"}`}
          >
            1
          </div>

          <div className="w-10 h-1 bg-gray-300"></div>

          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 2 ? "bg-purple-500 text-white" : "bg-gray-300"}`}
          >
            2
          </div>

          <div className="w-10 h-1 bg-gray-300"></div>

          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 3 ? "bg-purple-500 text-white" : "bg-gray-300"}`}
          >
            3
          </div>
        </div>

        <div className="flex justify-center gap-10 text-sm text-gray-500 mb-6">
          <span>Basic Info</span>
          <span>Details</span>
          <span>Password</span>
        </div>

        {step === 1 && (
          <>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="fullName"
              placeholder="Enter your full name"
              className="input mt-2"
              onChange={handleChange}
            />

            <label className="text-sm text-gray-600 mt-4 block">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter your email"
              className="input mt-2"
              onChange={handleChange}
            />

            <button
              onClick={() => {
                if (validateStep1()) {
                  setStep(2);
                }
              }}
              className="btn mt-6 w-full py-3"
            >
              Continue →
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              name="hostelName"
              placeholder="Hostel Name"
              className="input"
              onChange={handleChange}
            />

            <input
              name="messCode"
              value={form.messCode}
              placeholder="Enter Mess Code"
              className="w-full mb-3 p-2 border rounded"
              onChange={handleChange}
            />

            <input
              name="enrolmentNumber"
              placeholder="Enrollment Number"
              className="input mt-3"
              onChange={handleChange}
            />

            <input
              name="roomNumber"
              placeholder="Room Number"
              className="input mt-3"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="input mt-3"
              onChange={handleChange}
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="w-full border py-2 rounded"
              >
                Back
              </button>

              <button
                onClick={() => {
                  if (validateStep2()) {
                    setStep(3);
                  }
                }}
                className="btn w-full"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="input"
              onChange={handleChange}
            />

            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              className="input mt-3"
              onChange={handleChange}
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(2)}
                className="w-full border py-2 rounded"
              >
                Back
              </button>

              <button onClick={handleSignup} className="btn w-full">
                Signup
              </button>
            </div>
          </>
        )}

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        <p className="text-sm mt-3 text-center text-gray-500">
          Are you an admin?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/admin/login")}
          >
            Admin Login
          </span>
        </p>
      </div>
    </div>
  );
}

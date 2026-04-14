import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      console.log("Firebase Token:", token);

      const res = await fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      console.log("Backend Response:", data);

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
    
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
    >
      Continue with Google
    </button>

    <p
      className="text-blue-600 cursor-pointer mt-4"
      onClick={() => navigate("/signup")}
    >
      New user? Signup
    </p>

  </div>
</div>
  );
}

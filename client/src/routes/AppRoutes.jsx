import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/student/Dashboard";
import Menu from "../pages/student/Menu";
import Feedback from "../pages/student/Feedback";
import Complaints from "../pages/student/Complaints";
import TodayMenu from "../pages/student/TodayMenu";
import Attendance from "../pages/student/Attendance";
import Login from "../pages/auth/Login";
import { Navigate } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import VerifyOtp from "../pages/auth/VerifyOtp";

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/student/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        
        <Route
          path="/student/menu"
          element={isAuthenticated ? <Menu /> : <Navigate to="/login" />}
        />
        <Route
          path="/student/menu/:day"
          element={isAuthenticated ? <TodayMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/student/today-menu"
          element={isAuthenticated ? <TodayMenu /> : <Navigate to="/login" />}
        />
        <Route
          path="/student/feedback"
          element={isAuthenticated ? <Feedback /> : <Navigate to="/login" />}
        />
        <Route
          path="/student/complaints"
          element={isAuthenticated ? <Complaints /> : <Navigate to="/login" />}
        />
        <Route
          path="/student/attendance"
          element={isAuthenticated ? <Attendance /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

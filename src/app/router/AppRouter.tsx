import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../../modules/home/Home";
import Dashboard from "../../modules/dashboard/Dashboard";
import Users from "../../modules/users/Users";
import Settings from "../../modules/settings/Settings";
import UserLoginpage from "../../modules/Auth/User/Loginpage";
import AdminLoginpage from "../../modules/Auth/Admin/Loginpage";
import LandingPage from "../View/Landing/page";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Login routes - không có layout */}
      <Route path="/login" element={<UserLoginpage />} />
      <Route path="/admin/login" element={<AdminLoginpage />} />

      {/* Admin routes - có MainLayout với Sidebar */}
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}


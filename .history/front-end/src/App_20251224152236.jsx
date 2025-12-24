import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Overview from "./components/Overview";
import Map from "./components/admin/Map";
import UserLogs from "./components/admin/UserLogs";
import UserManagement from "./components/admin/UserManagement";
import Analysis from "./components/admin/Analysis";
import Profile from "./components/Profile";
import { useTheme } from "./context/ThemeProvider";
import { BotProvider } from "./context/BotContext";
import { useUserDetails } from "./context/UserContext";
import AutoLogout from "./config/AutoLogout";

const App = () => {
  const { userDetails, setuserDetails } = useUserDetails();
  const { isDark } = useTheme();
  const role = userDetails?.role;
  const location = useLocation();
  const isLoginpage = location.pathname === "/login";
  return (
   <>
   <T
   </>
  );
};

export default App;

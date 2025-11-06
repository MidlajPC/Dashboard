import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Overview from "./components/Overview";
import Map from "./components/admin/Map";
import UserLogs from "./components/admin/UserLogs";
import UserManagement from "./components/admin/UserManagement";
import Analysis from "./components/admin/Analysis";
import Profile from "./components/Profile";
import { useUserDetails } from "./context/UserContext";
import { useTheme } from "./context/ThemeProvider";
import  socket  from "./config/socket";

const App = () => {
  const { userDetails, setuserDetails } = useUserDetails();
  const { isDark } = useTheme();
  console.log(isDark);
  const role = userDetails?.role;
  
  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Overview />} />
            {role === "admin" && (
              <>
                <Route path="livemap" element={<Map />} />
                <Route path="usermanagement" element={<UserManagement />} />
              </>
            )}
            {(role === "admin" || role === "analyst") && (
              <>
                <Route path="userlog" element={<UserLogs />} />
                <Route path="analysis" element={<Analysis />} />
              </>
            )}
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

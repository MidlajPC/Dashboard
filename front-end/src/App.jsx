import React from "react";
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

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Overview />} />
            <Route path="livemap" element={<Map />} />
            <Route path="userlog" element={<UserLogs />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="usermanagement" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

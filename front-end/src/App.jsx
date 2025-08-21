import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes/>}>
        <Route path="/" element={<Home/>}>
        </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

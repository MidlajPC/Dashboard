import React from "react";
import axios from "../config/axios.config";
import "../css/Bg.css";
import "../css/Home.css";
import bg from "../assets/bg/bg.jpg";
import Header from "../components/Header";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md"; // Overview
import { FaMapMarkedAlt } from "react-icons/fa"; // Live Map
import { FaUsersCog } from "react-icons/fa"; // User Management
import { FaClipboardList } from "react-icons/fa"; // User Logs
import { IoSettingsSharp } from "react-icons/io5"; // Settings
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentsection = (path) => {
    switch (path) {
      case "/":
        return "Overview";
      case "/livemap":
        return "Live Map";
      case "/usermanagement":
        return "User Management";
      case "/userlog":
        return "User Logs";
      default:
        return "Unknown";
    }
  };
  const activeSection = currentsection(location.pathname);
  const handleLogout = () => {
    navigate("/login");
    axios
      .post("/logout")
      .then((res) => {
        localStorage.removeItem("userId");
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Logout failed");
      });
  };
  return (
    <div
      className="min-h-screen min-w-screen flex flex-col "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header />
      <div className="flex flex-1 pb-2 ">
        <div className="bg-black/10 w-[50px] sm:w-[150px] md:w-[180px] lg:w-[230px] mx-2 rounded-sm backdrop-blur-2xl flex flex-col justify-between  ">
          <div className="flex flex-col gap-5">
            <Link to={"/"} className="">
              <div className="sidebar-div">
                <MdDashboard className="icons" />
                <span className="sidebar-text ">Overview</span>
              </div>
            </Link>
            <Link to={"livemap"} className="">
              <div className="sidebar-div">
                <FaMapMarkedAlt className="icons" />
                <span className="sidebar-text ">Live Map</span>
              </div>
            </Link>
            <Link to={"usermanagement"} className="">
              <div className="sidebar-div">
                <FaUsersCog className="icons" />
                <span className="sidebar-text ">User Management</span>
              </div>
            </Link>
            <Link to={"userlog"} className="">
              <div className="sidebar-div">
                <FaClipboardList className="icons" />
                <span className="sidebar-text ">User Logs</span>
              </div>
            </Link>
          </div>
          <div
            className=" sidebar-div mb-1 cursor-pointer "
            onClick={handleLogout}
          >
            <CiLogout className="icons" />
            <span className="sidebar-text">Logout</span>
          </div>
        </div>
        <div className="relative bg-black/10 flex-1 rounded-sm backdrop-blur-2xl mr-2 ">
          <div className="relative rounded-sm bg-[#F5F5F5] shadow-lg h-full papper-effct flex flex-col  ">
            <div className="h-[56px] w-full border-b-1 border-gray-300 flex gap-1 sm:gap-2 md:gap-5 ">
              <div className="triangle"></div>
              <span className=" text-gray-300 font-bold self-center">
                {activeSection}
              </span>
            </div>
            <div className="flex-1 rounded-b-sm overflow-hidden">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

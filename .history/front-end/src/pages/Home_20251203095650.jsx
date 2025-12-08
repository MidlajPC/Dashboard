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
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5"; // Settings
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUserDetails } from "../context/UserContext";
import { SiHelpscout } from "react-icons/si";
import socket from "../config/socket";
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
      case "/analysis":
        return "Analysis";
      default:
        return "Unknown";
    }
  };
  const { userDetails, setuserDetails } = useUserDetails();
  const role = userDetails?.role;
  const activeSection = currentsection(location.pathname);
  const handleLogout = () => {
    navigate("/login");
    axios
      .post("/logout")
      .then((res) => {
        localStorage.removeItem("userId");
        toast.success("Logged out successfully");
        socket.disconnect();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Logout failed");
      });
  };
  const [issidebarOpen, setissidebarOpen] = useState(false);
  const togglesidebar = () => {
    if (window.innerWidth < 640) {
      setissidebarOpen((prev) => !prev);
    }
  };
  return (
    <div
      className="h-screen flex flex-row home-bg overflow-x-hidden overflow-y-auto"
      // style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className={` sidebar flex-shrink-0 !z-50 sidebar  backdrop-blur-2xl flex flex-col justify-between ${
          issidebarOpen ? "w-[150px]" : "w-[30px] lg:w-[60px]"
        } `}
      >
        <div className="flex flex-col  gap-2">
          <div className="flex sidebar-div items-center title-div">
            <SiHelpscout className="icons" onClick={togglesidebar} />
            <p className="sidebar-text !text-xl ">SCOUT V12</p>
          </div>
          <Link to={"/"} className="">
            <div className="sidebar-div mt-5">
              <MdDashboard className="icons" />
              <span className="sidebar-text ">Overview</span>
            </div>
          </Link>
          {role === "admin" && (
            <>
              <Link to={"livemap"} className="">
                <div className="sidebar-div">
                  <FaMapMarkedAlt className="icons text-[var(--text-color)]" />
                  <span className="sidebar-text text-[var(--text-color)] ">
                    Live Map
                  </span>
                </div>
              </Link>
              <Link to={"usermanagement"} className="">
                <div className="sidebar-div">
                  <FaUsersCog className="icons text-[var(--text-color)]" />
                  <span className="sidebar-text overflow-hidden text-[var(--text-color)] ">
                    User Management
                  </span>
                </div>
              </Link>
            </>
          )}
          {(role === "admin" || role === "analyst") && (
            <>
              <Link to={"analysis"} className="">
                <div className="sidebar-div">
                  <TbDeviceAnalytics className="icons text-[var(--text-color)]" />
                  <span className="sidebar-text text-[var(--text-color)] ">
                    Analysis
                  </span>
                </div>
              </Link>
              <Link to={"userlog"} className="">
                <div className="sidebar-div">
                  <FaClipboardList className="icons text-[var(--text-color)]" />
                  <span className="sidebar-text text-[var(--text-color)] ">
                    User Logs
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
        <div
          className=" sidebar-div mb-1 cursor-pointer "
          onClick={handleLogout}
        >
          <CiLogout className="icons text-[var(--text-color)]" />
          <span className="sidebar-text text-[var(--text-color)]">Logout</span>
        </div>
      </div>

      {/* header and outlet div */}
      <div className=" min-w-0 shadow-2xl flex flex-col flex-1">
        <div className="">
          <Header />
        </div>
        <div className="flex flex-1 pb-1  min-h-0 overflow-x-hidden">
          <div className="relative home-main-div flex-1  backdrop-blur-2xl min-h-0 ">
            <div className="relative rounded-sm shadow-lg h-full papper-effct flex flex-col ">
              <div className="h-[52px] w-full border-b-1 border-gray-300 flex  gap-1 sm:gap-2 md:gap-5">
                <div className="triangle"></div>
                <span className=" text-[var(--text-color)] font-bold self-center">
                  {activeSection}
                </span>
              </div>
              <div className="flex-1 outlet w-full max-w-full rounded-b-sm overflow-y-auto min-h-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

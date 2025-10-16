import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { CiDark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../css/dropdown.css";
import Profile from "./Profile";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    setprofileOpn(!profileOpn);
    navigate("/profile");
  };
  const [profileOpn, setprofileOpn] = useState(false);
  return (
    <header className="relative h-[30px] md:h-[55px] px-1 sm:px-3 flex items-center justify-between bg-[#262626 ">
      <div className="flex items-center">
        <p>SCOUT V12</p>
      </div>
      <div className="text-white text-3xl flex gap-2 mr-3">
        <CiDark className={`${theme==='light'?'text-black':'text-F5F5F5'}`} onClick={()=>{toggleTheme();}} />
        <RxAvatar onClick={handleProfileClick} className={`${theme==='light'?'text-black':'text-F5F5F5'}`} />
      </div>
      {profileOpn && createPortal(<Profile />, document.body)}
    </header>
  );
};

export default Header;

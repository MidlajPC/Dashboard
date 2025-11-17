import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { CiDark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../css/dropdown.css";
import Profile from "./Profile";
import { LuSun } from "react-icons/lu";
import { useTheme } from "../context/ThemeProvider";

const Header = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    setprofileOpn(!profileOpn);
    navigate("/profile");
  };
  const [profileOpn, setprofileOpn] = useState(false);
  const { isDark, setisDark } = useTheme();
  const handleTheme = (e) => {
    setisDark(!isDark);
  };
  return (
    <header className="relative z-20 w-[calc(100vw-20px)] lg:w-[calc(100vw-60px)] shadow-md h-[30px] md:h-[55px] px-1 sm:px-3 flex items-center justify-end ">
      <div className="text-white text-3xl flex gap-2 mr-3">
        <div onClick={handleTheme} className="">
          <CiDark className="theme-icon text" />
        </div>
        <RxAvatar className="theme-icon" onClick={handleProfileClick} />
      </div>
      {profileOpn && createPortal(<Profile />, document.body)}
    </header>
  );
};

export default Header;

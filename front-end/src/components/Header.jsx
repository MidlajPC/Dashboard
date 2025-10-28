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
    const checked = e.target.checked;
    setisDark(checked);
  };
  return (
    <header className="relative h-[30px] md:h-[55px] px-1 sm:px-3 flex items-center justify-between bg-[#262626 ">
      <div className="flex items-center title-div">
        <p>SCOUT V12</p>
      </div>
      <div className="text-white text-3xl flex gap-2 mr-3">
        <div>
          <label htmlFor="toggle" className="switch">
            <input
              type="checkbox"
              checked={isDark}
              onChange={handleTheme}
              id="toggle"
            />
            <span className="toggle-slider">
              <span className="t-icon">
                <LuSun className="light" />
                <CiDark className="dark" />
              </span>
            </span>
          </label>
        </div>
        <RxAvatar className="text-black" onClick={handleProfileClick} />
      </div>
      {profileOpn && createPortal(<Profile />, document.body)}
    </header>
  );
};

export default Header;

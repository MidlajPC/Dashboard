import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from ".";

const AutoLogout = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef();
  const logout = () => {
    navigate("/login");
    axios
      .post("/logout", { message: "logged out due to inactivity" })
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
  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, 1 * 60 * 1000);
  };
  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    for (const event of events) {
      document.addEventListener(event, resetTimeout);
    }
    resetTimeout();
    return () => {
      for (const event of events) {
        document.removeEventListener(event, resetTimeout);
      }
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return children;
};

export default AutoLogout;

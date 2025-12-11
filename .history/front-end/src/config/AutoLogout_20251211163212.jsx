import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef();
  const Logout = () => {
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
  const
  return children;
};

export default AutoLogout;

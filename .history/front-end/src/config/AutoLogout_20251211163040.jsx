import React from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = ({ children }) => {
  const navigate = useNavigate();
  const Logout = () => {
    navigate("/login");
    axios
      .post("/logout",{message:"logged "})
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
  return children;
};

export default AutoLogout;

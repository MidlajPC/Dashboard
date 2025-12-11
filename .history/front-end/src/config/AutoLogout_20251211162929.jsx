import React from "react";

const AutoLogout = ({ children }) => {
  const 
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
  return children;
};

export default AutoLogout;

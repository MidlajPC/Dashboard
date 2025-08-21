import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userDetails, setuserDetails] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      axios
        .get("/me")
        .then((res) => setuserDetails(res.data.user))
        .catch((err) => {
          console.log("session expired", err);
          sessionStorage.removeItem("authToken");
          setuserDetails(null);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ userDetails, setuserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserDetails = () => useContext(UserContext);

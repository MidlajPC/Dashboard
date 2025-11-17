import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const navigation 
  const [userDetails, setuserDetails] = useState(null);
  const mefetch = async () => {
    axios
      .get("/me")
      .then((res) => setuserDetails(res.data.user))
      .catch((err) => {
        console.log("session expired", err);
        setuserDetails(null);
        na
      });
  };
  useEffect(() => {
    mefetch();
  }, []);
  return (
    <UserContext.Provider value={{ userDetails, setuserDetails, mefetch }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserDetails = () => useContext(UserContext);

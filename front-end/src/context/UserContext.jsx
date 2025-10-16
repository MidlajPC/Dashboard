import { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userDetails, setuserDetails] = useState(null);
  const mefetch = async () => {
    axios
      .get("/me")
      .then((res) => setuserDetails(res.data.user))
      console.log(userDetails)
      .catch((err) => {
        console.log("session expired", err);
        setuserDetails(null);
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

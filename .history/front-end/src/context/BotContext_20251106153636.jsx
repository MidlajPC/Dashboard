import React, { createContext, useState } from "react";
import axios from "../config/axios.config";

const botContext = createContext();
export const BotProvider = ({ children }) => {
  const [botData, setbotData] = useState(null);
  const getBots = () => {
    axios.get("/getbots").then((res) => {
      console.log(res);
      setbotData(res.data.bots);
    });
  };
  useEffect(() => {
    getBots();
  }, []);
  return (
    <botContext.Provider value={{ botData, setbotData, getBots }}>
      {children}
    </botContext.Provider>
  );
};
export const us
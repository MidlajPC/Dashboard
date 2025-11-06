import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";
import socke

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
export const useBotData = () => useContext(botContext);

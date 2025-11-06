import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";
import socket from "../config/socket";

const botContext = createContext();
export const BotProvider = ({ children }) => {
  const [botData, setbotData] = useState(null);
  useEffect(()=>{
    socket.on
  },[])
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

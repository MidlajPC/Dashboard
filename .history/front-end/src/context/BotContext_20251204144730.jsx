import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/axios.config";
import socket from "../config/socket";

const botContext = createContext();
export const BotProvider = ({ children }) => {
  const [botData, setbotData] = useState(null);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("/verify");
        if (res.status === 200) {
          socket.connect();
        }
      } catch (error) {
        console.log(error.message || error, ": Not authenticated");
      }
    };
    verifyUser();
  }, []);
  useEffect(() => {
    socket.on("botData", (data) => {
      console.log("bot Data:", data);
      setbotData(data);
      if (botData) console.log(botData);
    });
    socket.emit("getBots");

    return () => {
      socket.off("botData");
    };
  }, []);
  // const getBots = () => {
  //   axios.get("/getbots").then((res) => {
  //     console.log(res);
  //     setbotData(res.data.bots);
  //   });
  // };
  // useEffect(() => {
  //   getBots();
  // }, []);
  return (
    <botContext.Provider value={{ botData, setbotData }}>
      {children}
    </botContext.Provider>
  );
};
export const useBotData = () => useContext(botContext);

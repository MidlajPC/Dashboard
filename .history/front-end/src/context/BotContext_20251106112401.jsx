import React, { createContext, useState } from "react";
import axios from "../config/axios.config";

const botContext = createContext();
export const BotProvider = ({ children }) => {
  const [botDat, setbotDat] = useState(null);
  const getBots = () => {
    axios.get("/getbots").then((res) => {
      console.log(res);
      setbots(res.data.bots);
    });
  };
};

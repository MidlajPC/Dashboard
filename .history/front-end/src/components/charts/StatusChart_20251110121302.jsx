import React from "react";
import { useBotData } from "../../context/BotContext";
import { useState, useEffect } from "react";

const StatusChart = () => {
  const { botData } = useBotData();
  const [statusData, setstatusData] = useState([]);
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not Ready yet:");
      return;
    }
    const formatedData=botData.flatMap((bot)=>bot.data.map((data)=>{}))
  }, [third])
  
  return <div></div>;
};

export default StatusChart;

import React from "react";
import { useBotData } from "../../context/BotContext";
import { useState, useEffect } from "react";

const StatusChart = () => {
  const { botData } = useBotData();
  const [statusData, setstatusData] = useState([]);
  useEffect(() => {
    Status
  }, [third])
  
  return <div></div>;
};

export default StatusChart;

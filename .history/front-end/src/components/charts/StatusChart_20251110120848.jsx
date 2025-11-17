import React from "react";
import { useBotData } from "../../context/BotContext";
import { useState,useff } from "react";

const StatusChart = () => {
  const { botData } = useBotData();
  const [statusData, setstatusData] = useState([])
  return <div></div>;
};

export default StatusChart;

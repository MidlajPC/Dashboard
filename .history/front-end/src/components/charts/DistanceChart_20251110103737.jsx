import React from "react";
import { useState } from "react";
import { useBotData } from "../../context/BotContext";

const DistanceChart = () => {
  const [data, setdata] = useState([]);
  const { botData, setbotData  } = useBotData();
  return <div>DistanceChart</div>;
};

export default DistanceChart;

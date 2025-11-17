import React from "react";
import { useState } from "react";
import { useBotData } from "../../context/BotContext";
import {Line,Legend,LineChart,ResponsiveContainer,X} from "recharts";

const DistanceChart = () => {
  const [data, setdata] = useState([]);
  const { botData, setbotData } = useBotData();
  return <div>DistanceChart</div>;
};

export default DistanceChart;

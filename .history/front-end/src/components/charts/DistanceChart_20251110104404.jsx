import React from "react";
import { useState } from "react";
import { useBotData } from "../../context/BotContext";
import {
  Line,
  Legend,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const DistanceChart = () => {
  const [data, setdata] = useState([]);
  const { botData, setbotData } = useBotData();
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not ready yet:");
      return;
    }
    const formatedData=botData.flatMap((bot)=>
    bot.map((data)=>{
        time
    }))
  }, [third]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart></LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistanceChart;

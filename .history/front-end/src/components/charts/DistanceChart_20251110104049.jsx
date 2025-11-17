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
  return <div>
    <ResponsiveContainer width="100%" height={300}>
        <LineChart>
            <
        </LineChart>
    </ResponsiveContainer>
  </div>;
};

export default DistanceChart;

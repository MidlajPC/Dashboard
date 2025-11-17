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
    const formatedData = botData.flatMap((bot) =>
      bot.map((data) => ({
        time: new Date(data.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        distanceCovered: data.DistanceCovered
      }))
    );
    setdata(formatedData);
  }, [botData]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width="100%" height={}></LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistanceChart;

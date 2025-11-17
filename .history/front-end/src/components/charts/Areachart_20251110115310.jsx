import React from "react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { useBotData } from "../../context/BotContext";
import { useEffect } from "react";

const Areachart = () => {
  const { botData } = useBotData();
  const [humidityData, sethumidityData] = useState([]);
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not Ready yet:");
      return;
    }
    const formatedData = botData.flatMap((bot) =>
      bot.data.map((data) => ({
        time: new Date(data.date).toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit"
        }),
        humidity:data.humidity
      }))
    );
  }, [botData]);

  return <div>
    <ResponsiveContainer width={}>

    </ResponsiveContainer>
  </div>;
};


export default Areachart;

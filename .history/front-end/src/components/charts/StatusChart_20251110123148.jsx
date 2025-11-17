import React from "react";
import { useBotData } from "../../context/BotContext";
import { useState, useEffect } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const StatusChart = () => {
  const { botData } = useBotData();
  const [statusData, setstatusData] = useState([]);
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not Ready yet:");
      return;
    }
    let formatedData = [
      { name: "charging", value: 0 },
      { name: "idle", value: 0 },
      { name: "active", value: 0 }
    ];
    botData.forEach((bot) => {
      bot.data.forEach((data) => {
        if (data.Status === "Charging") {
          formatedData[0].value += 1;
        } else if (data.Status === "Idle") {
          formatedData[1].value += 1;
        } else {
          formatedData[2].value += 1;
        }
      });
    });
    console.log(formatedData);
    setstatusData(formatedData);
  }, [botData]);

  return <div>
    <ResponsiveContainer
  </div>;
};

export default StatusChart;

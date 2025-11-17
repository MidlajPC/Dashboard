import React from "react";
import { useBotData } from "../../context/BotContext";
import { useState, useEffect } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
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

  return (
    <div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {statusData.map((entry,index)=>(
                <Cell key={}
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;

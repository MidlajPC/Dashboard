import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { useBotData } from "../../context/BotContext";

const Barchart = () => {
  const [wasteData, setwasteData] = useState([]);
  const { botData, setbotData } = useBotData();
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not Ready yet:");
      return;
    }
    const formatedData = botData.flatMap((bot) =>
      bot.data.map((data) => ({
        name: bot.name,
        wasteTray: data.Wastetraystatus
      }))
    );
    console.log(formatedData);
    setwasteData(formatedData);
  }, [botData]);

  return (
    <ResponsiveContainer>
      <BarChart
        width={400}
        height={400}
        data={wasteData}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Bar
          type={"monotone"}
          dataKey="p1"
          fill="#3b82f6"
          stroke="#2563eb"

        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// const CUstomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md ">
//         <p className="font-medium  ">{label}</p>
//         <p className="text-sm text-blue-400  ">
//           Product 1:
//           <span className="ml-2">{payload[0].value}</span>
//         </p>
//         <p className="text-sm text-indigo-400  ">
//           Product 2:
//           <span className="ml-2">{payload[1].value}</span>
//         </p>
//       </div>
//     );
//   }
// };

export default Barchart;

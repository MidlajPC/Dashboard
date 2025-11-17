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

const Areachart = () => {
  const {botData}=useBotData()
  const [humidityData, sethumidityData] = useState([])
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not Ready yet:");
      return;
    }
  }, [botData])
  
  return (
    <ResponsiveContainer>
      <AreaChart
        width={400}
        height={400}
        data={productsales}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="n" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip  />
        <Legend />
        <Area
          type={"monotone"}
          dataKey="p1"
          fill="#eb25d4"
          stroke="#2563eb25d4eb"
          stackId="1"
        />
        <Area
          type={"monotone"}
          dataKey="p2"
          fill="#3b82f6"
          stroke="#2563eb"
          stackId="1"
        />
      </AreaChart>
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

export default Areachart;

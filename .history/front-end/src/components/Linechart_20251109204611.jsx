import React, { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { useBotData } from "../context/BotContext";

const Linechart = () => {
  const [data, setdata] = useState([]);
  const { botData, setbotData } = useBotData();
  console.log(botData);
  useEffect(() => {
    if (!botData) {
      console.log("botData is not ready yet:", botData);
      return;
    }
    const formatedData = botData.flatMap((bot) =>
      bot.data.map(entry)({
        time: new Date(entry.date).toLocaleString(),
        battery: entry.Battery,
        humidity: parseFloat(entry.humidity),
        temperature: entry.temp
      })
    );
    console.log(formatedData);
    setdata(formatedData);
  }, [botData]);
  const productsales = [
    {
      n: "jan",
      p1: 4,
      p2: 5
    },
    {
      n: "feb",
      p1: 2,
      p2: 9
    },
    {
      n: "mar",
      p1: 2,
      p2: 3
    },
    {
      n: "apr",
      p1: 10,
      p2: 8
    },
    {
      n: "may",
      p1: 4,
      p2: 1
    },
    {
      n: "jun",
      p1: 3,
      p2: 3
    },
    {
      n: "jul",
      p1: 4,
      p2: 6
    },
    {
      n: "aug",
      p1: 2,
      p2: 8
    },
    {
      n: "sep",
      p1: 3,
      p2: 1
    },
    {
      n: "oct",
      p1: 10,
      p2: 5
    },
    {
      n: "nov",
      p1: 7,
      p2: 3
    },
    {
      n: "dec",
      p1: 1,
      p2: 6
    }
  ];
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width="100%"
          height="100%"
          data={data}
          margin={{ right: 30 }}
        >
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" label={{ value: "Battery %", angle: -90 }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Temp °C", angle: -90 }}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip content={<CUstomTooltip />} />
          <Legend />
          <Line
            type={"monotone"}
            yAxisId="left"
            dataKey="battery"
            name="Battery"
            dot={false}
            fill="#3b82f6"
            stroke="#2563eb"
            stackId="1"
          />
          <Line
            type={"monotone"}
            yAxisId="right"
            dataKey="temp"
            name="Temperature"
            dot={false}
            fill="#3b82f6"
            stroke="#2563eb"
            stackId="1"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const CUstomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md ">
        <p className="font-medium  ">{label}</p>
        <p className="text-sm text-blue-400  ">
          Product 1:
          <span className="ml-2">{payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400  ">
          Product 2:
          <span className="ml-2">{payload[1].value}</span>
        </p>
      </div>
    );
  }
};
export default Linechart;

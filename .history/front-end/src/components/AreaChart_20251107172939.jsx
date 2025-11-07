import React from "react";
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

const Areachart = () => {
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
    <ResponsiveContainer>
      <AreaChart width={400} height={400} data={productsales}>
        <YAxis />
        <XAxis dataKey="n" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Area
          type={"monotone"}
          dataKey="p1"
          fill="#3b82f6"
          stroke="#2563eb"
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

const CUstomTooltip=({active,payload,label})=>{
    if(active&&payload&&payload.length){
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md ">
                <p className="text-medium ">{label}</p>
            </div>
        )
    }
}

export default Areachart;

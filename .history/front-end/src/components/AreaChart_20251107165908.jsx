import React from "react";
import { Area, AreaChart } from "recharts";

const AreaChart = () => {
    const productsales=[
        {
            n:"jan",
            p1:4,
            p2:5
        },
        {
            n:"feb",
            p1:2,
            p2:9
        },
        {
            n:"mar",
            p1:2,
            p2:3
        },
        {
            n:"apr",
            p1:10,
            p2:8
        },
        {
            n:"may",
            p1:4,
            p2:1
        },
        {
            n:"jun",
            p1:3,
            p2:3
        },
        {
            n:"jul",
            p1:4,
            p2:6
        },
        {
            n:"aug",
            p1:2,
            p2:8
        },
        {
            n:"sep",
            p1:3,
            p2:1
        },
        {
            n:"oct",
            p1:10,
            p2:5
        },
        {
            n:"nov",
            p1:7,
            p2:3
        },
        {
            n:"dec",
            p1:1,
            p2:6
        },
    ]
  return (
  <AreaChart width={500}  >
  </AreaChart>
  )
}

export default AreaChart;

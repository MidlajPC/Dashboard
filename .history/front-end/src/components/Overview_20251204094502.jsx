import React from "react";
import "../css/overview.css";
import BatteryTempChart from "./charts/BatteryTempChart";
import Barchart from "./charts/Barchart";
import HumidityChart from "./charts/HumidityChart";
import DistanceChart from "./charts/DistanceChart";
import StatusChart from "./charts/StatusChart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 p-3 overflow-y-auto flex flex-col gap-2">
      <div className=" flex flex-col md:flex-row gap-2 h-[350px] bg-amber-300 ">
        <div className="card h-[300px] md:h-[350px] flex-1">
          <Barchart />
        </div>
        <div className="flex-1 card h-[300px] md:h-[350px]">
          <StatusChart />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 h-[350px] w-full bg-amber-950">
        <div className="card flex-1">
          <BatteryTempChart />
        </div>
        <div className=" flex-1 card">
          <HumidityChart />
        </div>
      </div>
      <div className="flex-1 card">
        <DistanceChart />
      </div>
      <div className=" h-[350px] flex">
        {/* <div className="flex flex-col">
          <div className="card flex-1">Total Bots Active </div>
          <div className="card flex-1">1</div>
        </div> */}
      </div>
    </div>
  );
};

export default Overview;

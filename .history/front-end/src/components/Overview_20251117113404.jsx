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
      <div className="flex gap-2 h-[350px] ">
        <div className=" flex-1 card">
          <Barchart />
        </div>
        <div className="flex-1 card">
          <StatusChart />
        </div>
      </div>

      <div className="flex gap-2 h-[350px]">
        <div className=" w-[200px] sm:w-[300px] md:w-[450px] lg:w-[800px] card">
          <HumidityChart />
        </div>
        <div className="flex-1 card">
          <DistanceChart />
        </div>
      </div>
      <div className=" h-[350px] flex">
        <div className="card h-full w-fit">
          <BatteryTempChart />
        </div>
        {/* <div className="flex flex-col">
          <div className="card flex-1">Total Bots Active </div>
          <div className="card flex-1">1</div>
        </div> */}
      </div>
    </div>
  );
};

export default Overview;

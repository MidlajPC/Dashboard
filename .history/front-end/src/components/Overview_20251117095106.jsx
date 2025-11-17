import React from "react";
import "../css/overview.css";
import BatteryTempChart from "./charts/BatteryTempChart";
import Barchart from "./charts/Barchart";
import HumidityChart from "./charts/HumidityChart";
import DistanceChart from "./charts/DistanceChart";
import StatusChart from "./charts/StatusChart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 p-3 overflow-y-auto flex flex-col ">
      <div className="flex m-2 gap-2 h-[350px] ">
        <div className=" flex-1 w-[200px] sm:w-[300px] md:w-[500px] lg:w-[800px] card">
          <Barchart />
        </div>
        <div className="flex-1 card">
          <StatusChart />
        </div>
      </div>
      <div className="card">
        <div className="h-[400px]">
          <BatteryTempChart />
        </div>
      </div>
      <div>
        <div className="h-[400px] card">
          <HumidityChart />
        </div>
        <div className="h-[400px]">
          <DistanceChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;

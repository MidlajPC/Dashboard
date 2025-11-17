import React from "react";
import "../css/overview.css";
import BatteryTempChart from "./charts/BatteryTempChart";
import Barchart from "./charts/Barchart";
import HumidityChart from "./charts/HumidityChart";
import DistanceChart from "./charts/DistanceChart";
import StatusChart from "./charts/StatusChart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 p-3 overflow-y-auto">
      <div className="flex m-2 ">
        <div className="h-[300px] w-[500px] ca">
          <Barchart />
        </div>
        <div className="flex-1">
          <StatusChart />
        </div>
      </div>
      <div className="h-[400px]">
        <HumidityChart />
      </div>
      <div className="h-[400px]">
        <BatteryTempChart />
      </div>
      <div className="h-[400px]">
        <DistanceChart />
      </div>
    </div>
  );
};

export default Overview;

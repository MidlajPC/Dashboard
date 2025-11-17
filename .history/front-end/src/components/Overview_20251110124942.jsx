import React from "react";
import "../css/overview.css";
import BatteryTempChart from "./charts/BatteryTempChart";
import Barchart from "./charts/Barchart";
import HumidityChart from "./charts/HumidityChart";
import DistanceChart from "./charts/DistanceChart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 p-3 overflow-y-auto">
      <div className="h-[400px] w-[800px]">
        <Barchart />
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
      <div className="h-[400px]">
        <DistanceChart />
      </div>
    </div>
  );
};

export default Overview;

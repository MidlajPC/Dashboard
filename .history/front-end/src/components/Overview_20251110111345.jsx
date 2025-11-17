import React from "react";
import "../css/overview.css";
import Areachart from "./charts/Areachart";
import Barchart from "./charts/Barchart";
import Linechart from "./charts/Linechart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 p-3 overflow-y-auto">
      <div className="h-[400px] w-[800px]">
        <Barchart />
      </div>
      <div className="h-[400px]">
        <Areachart />
      </div>
      <div className="h-[400px]">
        <Linechart />
      </div>
      <div className="h-[400px]">
        <Linechart />
      </div>
    </div>
  );
};

export default Overview;

import React from "react";
import "../css/overview.css";
import Areachart from "./AreaChart";
import Barchart from "./Barchart";
import Linechart from "./Linechart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 p-3">
     <div className="h-[250px]">
      <Barchart/>
     </div>
     <div className="h-[400px]">
      <Areachart/>
     </div>
    </div>
  );
};

export default Overview;

import React from "react";
import "../css/overview.css";
import Areachart from "./AreaChart";
import Barchart from "./Barchart";
import Linechart from "./Linechart";

const Overview = () => {
  return (
    <div className="transition-colors duration-300 pb-3">
     <div >
      <Areachart/>
     </div>
    </div>
  );
};

export default Overview;

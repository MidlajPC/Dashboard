import React from "react";
import "../css/overview.css";
import Areachart from "./AreaChart";
import Barchart from "./Barchart";
import Linechart from "./Linechart";

const Overview = () => {
  return (
    <div className="flex flex-col w-full min-h-[800px] max-h-full overflow-y-auto transition-colors duration-300 pb-3">
      {/* Grid Layout for All Cards */}
      <div className="flex flex-col bg-amber-50 gap-5">
        <div className=" w-[500px] bg-amber-200 ">
          <Barchart />
        </div>
        <div className=" card bg-[var(--bg-color)] ">
          <Areachart />
        </div>
        <div className=" card bg-[var(--bg-color)] ">
          <Linechart />
        </div>
        <div className=" card bg-[var(--bg-color)] ">Card 4</div>
        <div className=" big-card col-span-1 sm:col-span-2 ">Visual 1</div>
        <div className=" big-card col-span-1 sm:col-span-2 xl:col-span-3 ">
          Visual 2
        </div>
      </div>
    </div>
  );
};

export default Overview;

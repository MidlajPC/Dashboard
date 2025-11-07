import React from "react";
import "../css/overview.css";
import Areachart from "./AreaChart";
import Barchart from "./Barchart";
import Linechart from "./Linechart";

const Overview = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full overflow-auto transition-colors duration-300 p-3">
      {/* Grid Layout for All Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className=" card bg-[var(--bg-color)] ">
          <Areachart />
        </div>
        <div className=" card bg-[var(--bg-color)] ">
          <Barchart />
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

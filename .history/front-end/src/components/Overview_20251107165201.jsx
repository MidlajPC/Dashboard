import React from "react";
import "../css/overview.css";
const Overview = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full overflow-auto transition-colors duration-300 p-3">
      {/* Grid Layout for All Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className=" card bg-[var(--bg-color)] "><Are></div>
        <div className=" card bg-[var(--bg-color)] ">Card 2</div>
        <div className=" card bg-[var(--bg-color)] ">Card 3</div>
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

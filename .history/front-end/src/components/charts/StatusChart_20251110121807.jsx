import React from "react";
import { useBotData } from "../../context/BotContext";
import { useState, useEffect } from "react";

const StatusChart = () => {
  const { botData } = useBotData();
  const [statusData, setstatusData] = useState([]);
  useEffect(() => {
    if (!botData) {
      console.log("BotData is not Ready yet:");
      return;
    }
    let formatedData = {
      charging: 0,
      idle: 0,
      active: 0
    };
    botData.flatMap((bot) =>
      bot.data.map((data) => {
        if (data.Status === "Charging") {
          formatedData.charging = +1;
        }else if(data.Status==="Id")
      })
    );
  }, [third]);

  return <div></div>;
};

export default StatusChart;

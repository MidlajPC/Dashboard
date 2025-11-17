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
    let formatedData={
        Charging:nu,
    }
    botData.flatMap((bot)=>bot.data.map((data)=>{
        if(data.Status==="Charging")
    }))
  }, [third])
  
  return <div></div>;
};

export default StatusChart;

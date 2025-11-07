const botModel = require("../model/bot.model");

module.exports.getbots = async (req, res) => {
  try {
    const bots = await botModel
      .find()
      .populate({ path: "data.operator", select: "name email" })
      .populate({ path: "operators.user", select: "-password" });
    if (bots) {
      res.status(200).json({ message: "bots found", bots: bots });
    } else {
      res.status(401).json({ message: "no bot found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.botsocket = (io, socket) => {

  const sendBotData=async(target)=>{
    try {
      const bots = await botModel
      .find()
      .populate({ path: "data.operator", select: "name email" })
      .populate({ path: "operators.user", select: "-password" });
      target.emit("botData", bots);
    } catch (error) {
      console.error("Error fetching bots:", err);
    }
  }
  sendBotData(socket);

  socket.on("getBots", async () => {
    sendBotData(socket);
  });

  const interval = setInterval(async () => {
    sendBotData(io);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    clearInterval(interval);
  });

  async function sendBotData(target) {
    try {
      const bots = await botModel
      .find()
      .populate({ path: "data.operator", select: "name email" })
      .populate({ path: "operators.user", select: "-password" });
      target.emit("botData", bots);
    } catch (error) {
      console.error("Error fetching bots:", err);
    }
  }
};

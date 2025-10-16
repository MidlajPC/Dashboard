const botModel = require("../model/bot.model");
module.exports.getbots = async (req, res) => {
  try {
    const bots = await botModel
      .find()
      .populate({ path: "currentuser", select: "name email" })
      .populate({ path: "data.operator", select: "name email" })
      .populate({path:"operators.user",select:"-password"})
    if (bots) {
      res.status(200).json({ message: "bots found", bots: bots });
    } else {
      res.status(401).json({ message: "no bot found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

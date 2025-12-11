const userLogModel = require("../model/userLogModel");
const userModel = require("../model/user.model");

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    const id = req.currentUser.id;
    const msg=
    await userModel.updateOne({ _id: id }, { activityStatus: false });
    await userLogModel.updateOne(
      { user: id },
      {
        $push: { actions: { action: "log out", details: "logged Out" } }
      }
    );
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getLogs = async (req, res) => {
  try {
    const logs = await userLogModel
      .find()
      .populate("user", "name email phone role location activityStatus");
    if (logs.length === 0) {
      res.status(401).json({ message: "no logs found" });
    }
    res.status(200).json({ message: "logs found", logs: logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

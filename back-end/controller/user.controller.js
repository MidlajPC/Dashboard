const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    if (user.activityStatus === false) {
      res.status(403).json({
        message: "Your Account is Deactiveted! contact Admin form more details!"
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      res.status(401).json({ message: "Incorrect password!" });
    }
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getme = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.currentUser.id)
      .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

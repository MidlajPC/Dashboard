const express = require("express");
const router = express.Router();
const botcontroller = require("../controller/bot.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/getbots", authenticate, botcontroller.getbots);

module.exports = router;

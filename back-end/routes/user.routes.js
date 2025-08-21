const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/login", userController.login);
router.get("/me",authenticate)

module.exports = router;

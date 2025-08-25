const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authenticate = require("../middleware/auth.middleware");
const userLogController = require("../controller/userLog.controller");

router.post("/login", userController.login);
router.get("/me", authenticate, userController.getme);
router.post("/logout", authenticate, userLogController.logout);
router.get("/getlogs", authenticate, userLogController.getLogs);
router.get("/getusers", authenticate, userController.getUsers);
router.post("/adduser", authenticate, userController.adduser);
router.put("/edituser/:id", authenticate, userController.updateuser);
router.delete("/deleteuser/:id", authenticate, userController.deleteUser);

module.exports = router;

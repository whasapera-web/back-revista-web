const express = require("express");
const router = express.Router();
const { validateUserLog, validateUserReg } = require("../middleware/validateUserLog");

const userController = require("../controller/user");

router.post("/login", validateUserLog, userController.userLog);
router.post("/register", validateUserReg, userController.userReg);
module.exports = router;

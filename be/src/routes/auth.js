const express = require("express");
const router = express.Router();

const { Loginverify } = require("../Controllers/Loginverify");
const { Logout } = require("../Controllers/Logout");
const { Signup } = require("../Controllers/Signup");
const { Login } = require("../Controllers/Login");


router.post("/signup", Signup);
router.post("/login", Login);
router.get("/loginverify", Loginverify);
router.get("/logout", Logout);

module.exports = router;

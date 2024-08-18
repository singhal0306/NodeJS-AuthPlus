const express = require("express");

const router = express.Router();
const authcontroller = require("../controllers/auth")

router.post("/signup", authcontroller.register);
router.post("/login", authcontroller.login);
router.get("/logout", authcontroller.logout);
router.post("/image" ,authcontroller.image); 

module.exports = router;
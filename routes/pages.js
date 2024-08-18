const express = require("express");
const authController = require("../controllers/auth")
const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("home", {
            user: req.user
        });
    } else {
        res.render("home");
    }
})

router.get("/login2", (req, res)=>{
    res.render("login2")
})

router.get('/signuppage', (req, res) => {
    res.render("signup");
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/profile", authController.isLoggedIn, (req, res) => {

    if (req.user) {
        res.render("profile", {
            user: req.user
        });
    } else {
        res.redirect("/login");
    }

})

module.exports = router;
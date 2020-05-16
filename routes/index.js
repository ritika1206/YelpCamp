const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const users = require("../models/users");
const passport = require("passport");
const localStrategy = require("passport-local");

// show register form
router.get("/register", (req, res) => {
    res.render("/users/register");
});

// handle register logic
router.post("/register", (req, res) => {
    users.register({username: req.body.username}, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.render("/users/register");
        }
        else{
            passport.authenticate("local")(req, res, () => {
                res.redirect("/campgrounds");
            })
        }
    })
});

// show login form
router.get("/login", (req, res) => {
    res.render("/users/login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campGrounds",
    failureRedirect: "/login"
}));

//logout
router.get("/logout", (req, res) => {
    res.logout();
    res.redirect("/campGrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;
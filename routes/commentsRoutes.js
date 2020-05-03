var mongoose = require("mongoose");
var campGrounds = require("../models/campGrounds");
var comments = require("../models/comments");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");




router.use(bodyParser.urlencoded({ extended: true }));

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    else{
        res.redirect("/login");
    }
}

router.get("/campGrounds/:id/comments/new", isLoggedIn, (req, res) => {
    campGrounds.findById(req.params.id, (err, foundCampGround) => {
        if(err){
            console.log(err);
            res.redirect("/campGrounds/:id");
        }
        else{
            res.render("comments/new", {campGround: foundCampGround});
        }
    })
});

router.post("/campGrounds/:id/comments", (req, res) => {
    campGrounds.findById(req.params.id, (err, campGround) => {
        if(err){
            console.log(err);
            res.redirect("/campGrounds/" + campGround._id);
        }
        else{
            comments.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                    res.redirect("/campGrounds/" + campGround._id);
                }
                else{
                    campGround.comments.push(comment);
                    campGround.save();
                    res.redirect("/campGrounds/" + campGround._id);
                }
            })
        }
    })
});

module.exports = router;
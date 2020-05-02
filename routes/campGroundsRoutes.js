var express = require("express");
var router = express.router();
var campGrounds = require("../models/campGrounds");
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

//INDEX
router.get("/campGrounds", (req, res) => {
    campGrounds.find({}, (err, allcampGrounds) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("campGrounds/campGrounds", {campGrounds: allcampGrounds, currentUser: req.user});
        }
    })
});

//CREATE
router.post("/campGrounds", (req, res) => {    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    
    campGrounds.create({name: name, image: image, desc: desc});

    res.redirect("/campGrounds");
});

//NEW
router.get("/campGrounds/new", (req, res) => {
    res.render("campGrounds/new");
});

//SHOW
router.get("/campGrounds/:id", (req, res) => {
    var id = req.params.id;
    campGrounds.findById(id).populate("comments").exec((err, campGround) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("campGrounds/show", {campGround: campGround});
        }
    });
});

//EDIT
router.get("/campGrounds/:id/edit", (req, res) => {
    campGrounds.findById(req.params.id, (err, campGround) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("campGrounds/edit", {id: req.params.id, campGround: campGround});
        }
    });
});

//UPDATE
router.put("/campGrounds/:id", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;

    campGrounds.updateOne({_id: req.params.id}, {$set: {name: name, image: image, desc: desc}}, (err, campGround) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(campGround);
            res.redirect("/campGrounds");
        }
    });
});

//DELETE
router.delete("/campGrounds/:id", (req, res) => {
    campGrounds.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campGrounds");
        }
    });
});

module.exports = router;
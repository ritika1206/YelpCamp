var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    // res.send("this will be the landing page of yelpcamp app");
    res.render("landing.ejs");
});

app.get("/campGrounds", function(req, res){
    // res.send("this will be the landing page of yelpcamp app");
    res.render("campGrounds.ejs");
});

var server = app.listen(3000, function(){
    console.log("the sever has been started.");
});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    // res.send("this will be the landing page of yelpcamp app");
    res.render("landing");
});

app.get("/campGrounds", (req, res) => {
    // res.send("this will be the landing page of yelpcamp app");
    res.render("campGrounds");
});

app.post("/campGrounds", (req, res) => {
    res.send("this is the campground post route");
});

app.get("/campGround/new", (req, res) => {
    res.render("new");
});

var server = app.listen('3636', () => {
    console.log("the sever has been started.");
});
var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    // res.send("this will be the landing page of yelpcamp app");
    res.render("landing.ejs");
});

app.get("/campGrounds", (req, res) => {
    // res.send("this will be the landing page of yelpcamp app");
    res.render("campGrounds.ejs");
});

var server = app.listen(3000, () => {
    console.log("the sever has been started.");
});
var express = require("express");
var ejs = require("ejs");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campGrounds = [
    {name: "majestic Hue", image: "https://im.rediff.com/getahead/2016/may/12camping1.jpg" },
    {name: "solace mountain", image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2016/10/Camping-Sites-Near-Bangalore.jpg"},
    {name: "panaromic view", image: "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2018/11/26/1380296-1891588228.jpg?itok=rD_hHuxx"}
]

app.get("/", (req, res) => {
    // res.send("this will be the landing page of yelpcamp app");
    res.render("landing");
});

app.get("/campGrounds", (req, res) => {
    // res.send("this will be the landing page of yelpcamp app");
    res.render("campGrounds", {campGrounds: campGrounds});
});

app.post("/campGrounds", (req, res) => {
    // res.send("<h1>this is the campground post route<h1>");
    var name = req.body.name;
    var image = req.body.image;
    var campground = {name: name, image: image};
    campGrounds.push(campground);
    res.redirect("/campGrounds");
});

app.get("/campGrounds/new", (req, res) => {
    res.render("new");
});

var server = app.listen('3636', () => {
    console.log("the sever has been started.");
});
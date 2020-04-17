var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp-camp-app");
mongoose.connect("uri", { useNewUrlParser: true });
mongoose.connect("uri", { useFindAndModify: false });
mongoose.connect("uri", { useCreateIndex: true });
mongoose.connect("uri", { useUnifiedTopology: true });

var campGroundsSchema = new mongoose.Schema({
    name: String,
    image: String
});

var campGrounds = mongoose.model("campGrounds", campGroundsSchema);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campGrounds", (req, res) => {
    res.render("campGrounds", {campGrounds: campGrounds});
});

app.post("/campGrounds", (req, res) => {    
    var name = req.body.name;
    var image = req.body.image;
    
    campGrounds.create({name: name, image: image});

    res.redirect("/campGrounds");
});

app.get("/campGrounds/new", (req, res) => {
    res.render("new");
});

var server = app.listen('4646', () => {
    console.log("the sever has been started.");
});
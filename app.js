var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp-camp-app");
mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useFindAndModify: false });
mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useCreateIndex: true });
mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useUnifiedTopology: true });

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
    campGrounds.find({}, (err, allcampGrounds) => {
        if(err){
            console.log(err);
        }
        else{
            // var campGroundsArray = Object.values(campGrounds);
            res.render("campGrounds", {campGrounds: "allcampGrounds"});
        }
    })
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
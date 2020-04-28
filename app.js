const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override"),
      comments       = require("./models/comments"),
      campGrounds    = require("./models/campGrounds"),
      users          = require("./models/users");
    

// mongoose.connect("mongodb://localhost:27017/yelp-camp-app");
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useFindAndModify: false });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useCreateIndex: true });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useUnifiedTopology: true });

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX
app.get("/campGrounds", (req, res) => {
    campGrounds.find({}, (err, allcampGrounds) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("campGrounds", {campGrounds: allcampGrounds});
        }
    })
});

//CREATE
app.post("/campGrounds", (req, res) => {    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    
    campGrounds.create({name: name, image: image, desc: desc});

    res.redirect("/campGrounds");
});

//NEW
app.get("/campGrounds/new", (req, res) => {
    res.render("new");
});

//SHOW
app.get("/campGrounds/:id", (req, res) => {
    var id = req.params.id;
    campGrounds.findById(id, (err, campGround) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campGround: campGround});
        }
    });
});

//EDIT
app.get("/campGrounds/:id/edit", (req, res) => {
    campGrounds.findById(req.params.id, (err, campGround) => {
        if(err){
            console.log(err);
        }
        else{
            res.render("edit", {id: req.params.id, campGround: campGround});
        }
    });
});

//UPDATE
app.put("/campGrounds/:id", (req, res) => {
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
app.delete("/campGrounds/:id", (req, res) => {
    campGrounds.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campGrounds");
        }
    });
});



app.listen('4646', () => {
    console.log("the sever has been started.");
});
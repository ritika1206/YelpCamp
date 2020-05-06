const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      methodOverride        = require("method-override"),
      comments              = require("./models/comments"),
      campGrounds           = require("./models/campGrounds"),
      users                 = require("./models/users");
      passport              = require("passport");
      localStrategy         = require("passport-local");
      passportLocalMongoose = require("passport-local-mongoose");
      session               = require("express-session"),
      seedDB                = require("./seeding");

// mongoose.connect("mongodb://localhost:27017/yelp-camp-app");
mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useFindAndModify: false });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useCreateIndex: true });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useUnifiedTopology: true });

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

var campGroundsRoutes = require("./routes/campGroundsRoutes");
    indexRoutes       = require("./routes/index");
    commentsRoutes    = require("./routes/commentsRoutes");


app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(session({
    secret: "hello there!",
    resave: false,
    saveUninitialised: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(users.authenticate()));

passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});

app.use("/campGrounds", campGroundsRoutes);
app.use("/campGrounds/:id/comments", commentsRoutes);
app.use(indexRoutes);

app.listen('4646', () => {
    console.log("the sever has been started.");
});
var mongoose = require("mongoose");
var comments = require("./comments.js");

var campGroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [
        {
            id: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
});


// mongoose.connect("mongodb://localhost:27017/yelp-camp-app");
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useFindAndModify: false });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useCreateIndex: true });
// mongoose.connect("mongodb://localhost:27017/yelp-camp-app", { useUnifiedTopology: true });


// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);


module.exports = mongoose.model("campGrounds", campGroundsSchema);
var mongoose  = require("mongoose");
var users = require("./users");

var commentSchema = new mongoose.Schema({
    text: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        username: String
    }
});

module.exports = mongoose.model("comments", commentSchema);
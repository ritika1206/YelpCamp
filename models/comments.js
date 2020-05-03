var mongoose  = require("mongoose");
var users = require("./users");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
});

module.exports = mongoose.model("comments", commentSchema);
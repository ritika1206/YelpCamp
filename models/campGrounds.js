var mongoose = require("mongoose");
var comments = require("./comments.js");
var users = require("./users");

var campGroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        username: String
    },
    comments: [
        {
            id: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
});


module.exports = mongoose.model("campGrounds", campGroundsSchema);
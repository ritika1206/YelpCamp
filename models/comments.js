var mongoose  = require("mongoose");
var users = require("./users");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
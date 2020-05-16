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

module.exports = mongoose.model("Comment", commentSchema);

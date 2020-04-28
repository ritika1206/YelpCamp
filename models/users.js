var mongoose = require("mongoose");
var comments = require("./comments");

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    comments: [
        {
            id: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]  
});

module.exports = mongoose.model("users", userSchema);


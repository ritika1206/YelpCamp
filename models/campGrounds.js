var mongoose = require("mongoose");

var campGroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    createdAt: {
        type: Date,
        deafult: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});


module.exports = mongoose.model("CampGround", campGroundsSchema);
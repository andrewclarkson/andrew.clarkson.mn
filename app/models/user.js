var mongoose = require("mongoose");

var User = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User', User);

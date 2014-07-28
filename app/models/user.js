var mongoose = require("mongoose");

var User = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.export = mongoose.model('User', User);

var mongoose          = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

var userScehma = new mongoose.Schema({
    username : String ,
    password : String
})

userScehma.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userScehma)

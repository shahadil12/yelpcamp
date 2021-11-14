var mongoose = require("mongoose")

var CampgroundSchema = new mongoose.Schema({
    name : String ,
    image :String ,
    description : String ,
    comment : [
    {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Comment"
    }],
    author : {
        id : {
           type : mongoose.Schema.Types.ObjectId ,
           ref : "User"
        },
        username : String 
    }      
})
module.exports = mongoose.model("Campground", CampgroundSchema);
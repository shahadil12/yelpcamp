var mongoose   = require("mongoose") ,
    Campground = require("./models/campground"),
    Comment    = require("./models/comment")

var data = [
    {
        name :"Glory Night" ,
        image :" https://pixabay.com/get/g70920d186d909c809bc5a378793d193d79251c08182f104c6647f6d8f83d9bf85a5ce4c182842932104282570561054f_340.jpg ",
        description :"fljsgskjf sakfsdkhfehnfj sdkjfsklfskfjsjfjffjjdj "
    },
    {
        name :"Shiny Clouds" ,
        image :" https://pixabay.com/get/gb71fc4cdca6c5ae7cde699d2e6f532ba601d774e3baaaaa87e7a0fab1a3f3cc2aed570639afc5d3913373ebfd9e141c5_340.jpg",
        description :"fljsgskjf sakfsdkhfehnfj sdkjfsklfskfjsjfjffjjdj "
    },
    {
        name :"Silent Mountains" ,
        image :"https://pixabay.com/get/g88aac06989eedcb635d47469b609137373fbf5c026e16faa3521640b0b4ec02840d59413bf3b8a478fc336a899b5411a_340.jpg",
        description :"fljsgskjf sakfsdkhfehnfj sdkjfsklfskfjsjfjffjjdj "
    }
]

function seeddb() {
    // Campground.remove({},function(err){
        // if(err){
            // console.log(err);
        // }else{
        //    console.log("removed");
        //    data.forEach(function(seed){
            // Campground.create(seed, function(err , campground){
                // if(err){
                    // console.log(err);
                // }else {
                //   console.log("added")
                //   Comment.create({
                    //   text :"Best place i have visited" ,
                    //   author : "Shah Adil"
                //   }, function(err , comment){
                    //   if(err){
                        //   console.log(err);
                    //   }else{
                        //   campground.comment.push(comment);
                        //   campground.save();
                    //   }
                //   }) 
                // }
            // })
        //    })  
        // }
    //})
 }

module.exports = seeddb ;

const comment = require("../models/comment");

var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");


router.get("/campgrounds",function (req , res) {
    Campground.find({},
       function (err , newlycamp) {
           if (err) {
               console.log("Error")
           }else{
            res.render("campgrounds",{campgrounds : newlycamp})
           }
       } 
    ) 
})

router.post("/campgrounds", middleware.isLoggedIn , function (req , res) {
    var name = req.body.name ;
    var image = req.body.image ;
    var description = req.body.description 
    var author = {
        id : req.user._id ,
        username : req.user.username
    }
    var newCampground = {name: name , image : image , description : description , author:author};
    Campground.create(newCampground,
       function (err, newlycreated) {
           if(err){
               console.log("Error")
           }else{
               res.redirect("/campgrounds");
           }
       }
    )
})

router.get("/campgrounds/new", middleware.isLoggedIn, function (req , res) {
    res.render("newcamp")
})

router.get("/campgrounds/:id",function (req , res) {
    Campground.findById(req.params.id).populate("comment").exec(function(err , foundcampground) {
        if(err){
            console.log(err)
        }else {
           
            res.render("show" , {campground: foundcampground })
        }
    })
})

router.get("/campgrounds/:id/edit" , middleware.campOwnership,function(req , res){
    Campground.findById(req.params.id , function(err , foundcampground){
        if(err){
            console.log(err);
        }else {
            res.render("edit", {campground : foundcampground});
        }
    })
})

router.put("/campgrounds/:id" ,middleware.campOwnership, function(req , res){
    Campground.findByIdAndUpdate(req.params.id ,req.body.camp , function (err , updatedcamp) {
        if(err){
            console.log(err)
        }else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/campgrounds/:id" ,middleware.campOwnership, function (req , res) {
    Campground.findByIdAndDelete(req.params.id , function (err) {
        if(err){
            console.log(err)
        }else{
            req.flash("success","Deleted Campground")
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router ;
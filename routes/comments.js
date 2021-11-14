const { isLoggedIn } = require("../middleware");

var express = require("express"),
    router  = express.Router({mergeParams : true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware");

router.get("/campround/:id/comments" ,middleware.isLoggedIn ,function (req , res) {
    Campground.findById(req.params.id , function (err , campground) {
        if(err){
            console.log(err)
        }else{
            res.render("new" , {campground : campground}) 
        }
    })
})

router.post("/campgrounds/:id", middleware.isLoggedIn,function(req , res){
    Campground.findById(req.params.id ,function(err , campground){
        if(err){
            console.log(err)
        }else {
            Comment.create(req.body.comment , function (err , comment) {
                if(err){
                    console.log(err)
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comment.push(comment);
                    campground.save();
                    req.flash("success","Comment created");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

router.get("/campgrounds/:id/comment/:comment_id/edit" ,middleware.commentOwnership,function (req , res) {
    Comment.findById(req.params.comment_id , function (err , foundcomment) {
        if(err){
            console.log(err)
        }else{
            res.render("commentedit", {campground_id:req.params.id ,comment:foundcomment})
        }
    })
})

router.put("/campgrounds/:id/comment/:comment_id" ,middleware.commentOwnership ,function (req , res) {
    Comment.findByIdAndUpdate(req.params.comment_id ,req.body.comment , function (err , foundcomment) {
        if(err){
            console.log(err)
        }else {
            req.flash("success", "Updated Comment")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/campgrounds/:id/comment/:comment_id",middleware.commentOwnership, function (req , res) {
   Comment.findByIdAndRemove (req.params.comment_id , function (err) {
       if(err){
           res.redirect("back")
       }else {
           req.flash("success","Deleted Comment")
           res.redirect("/campgrounds/" + req.params.id)
       }
   })
})

module.exports = router ;
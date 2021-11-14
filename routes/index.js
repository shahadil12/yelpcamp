var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User    = require("../models/user"),
    middleware = require("../middleware");

router.get("/",function (req , res) {
    res.render("homepage");
})

router.get("/campgrounds/register",function(req , res){
    res.render("register")
})

router.post("/campgrounds/register",function(req , res){
    var newuser = new  User({username : req.body.username})
    User.register(newuser , req.body.password ,function(err , user){
       if(err){
           console.log(err);
       } else {
           passport.authenticate("local")(req , res , function(){
              req.flash("success","Successfully Registered")
              res.redirect("/campgrounds");
           })
       }
    })
})
router.get("/campgrounds/login",function (req , res) {
    res.render("login")
})

router.post("/campgrounds/login",passport.authenticate("local",
    {
        successRedirect : "/campgrounds" , 
        faliureRedirect : "/login"
    }), function(req , res){
})

router.get("/campgrounds/logout", function (req , res) {
    req.logOut();
    req.flash("success","Successfully logout")
    res.redirect("/campgrounds")
})

module.exports = router ;

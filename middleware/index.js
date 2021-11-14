var middleware = {}

middleware.campOwnership = function(req , res , next){
                 if(req.isAuthenticated()){
                      Campground.findById(req.params.id, function (err , foundcampground) {
                       if(err){
                          console.log(err)
                       }else { 
                         if(foundcampground.author.id.equals(req.user._id)){
                            next();
                         }else {
                           res.redirect("back");
                        }
            }
        })
    }else{
        res.redirect("back");
    }
}

middleware.commentOwnership = function(req , res , next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err,foundcomment ) {
            if(err){
                res.redirect("back")
            }else {
                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                }else {
                    res.redirect("back");
                }
            }
        })
    }  else{
        res.redirect("back");
    }
}

middleware.isLoggedIn = function (req , res , next){
                if(req.isAuthenticated()){
                return next();
               }
                 req.flash("error","Please login first")
                 res.redirect("/campgrounds/login")
}




module.exports = middleware ;
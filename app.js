const express    = require("express"),
      app        = express(),
      ejs        = require("ejs"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose") ,
      passport   = require("passport"),
      LocalStrategy = require("passport-local") 
      methodOverride = require("method-override"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment") ,
      User       = require("./models/user"),
      seeddb     = require("./seeds"),
      flash      = require("connect-flash");
     
      
const campground = require("./models/campground");
const comment = require("./models/comment");
const indexRoutes      = require("./routes/index"),
      campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes    = require("./routes/comments");

//mongoose.connect("mongodb://localhost:27017/yelp_camp" ,{useNewUrlParser: true , useUnifiedTopology : true});
mongoose.connect("mongodb+srv://shahadil:1a234567%40@cluster0.mlas3.mongodb.net/yelp_camp?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology : true}); 
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs") ;
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seeddb();

app.use(require("express-session")({
    secret : "My fav hero is gus" ,
    resave : false ,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function (req , res , next) {
    res.locals.currentuser = req.user ;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(2300,function () {
    console.log("Yelpcamp app is started") ;
})

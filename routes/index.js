const express = require('express'),
      passport  = require('passport'),
      Image    = require("../models/images");
      User    = require("../models/user.js");
      router  = express.Router();

router.get("/", (req, res) => { // Show all images
   Image.find({}, (err, foundImg) => {
     if(err) {
       console.log(err);
     } else {
      res.render("index", {foundImg});
     }
   })
});

/* HANDLE REGISTER */

router.get("/register", (req, res) => {
  res.render("register");
})

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({username});
  User.register(newUser, password, (err, user) => {
      if(err){
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
        res.redirect("/"); 
    });
  });
})

/* HANDLE LOGIN */
router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/",
    failureRedirect: "/login",
  }), function(req, res){
});

/*HANDLE LOGGOUT */
router.get("/logout", function(req, res){
  req.logOut();
  res.redirect("/");
});


module.exports = router;
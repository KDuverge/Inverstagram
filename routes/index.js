const express = require('express'),
      passport  = require('passport'),
      User    = require("../models/user.js");
      router  = express.Router();

router.get("/", (req, res) => { // Show all images
    res.render("index")
});

/* HANDLE REGISTER*/

router.get("/register", (req, res) => {
  res.render("register");
})

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({username});
  User.register(newUser, password, (err, user) => {
      if(err){
        console.log(err);
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
    failureFlash: true,
    successFlash: 'Welcome to !nstagram'
  }), function(req, res){
});


module.exports = router;
const Image = require("../models/images");
const Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.checkImageOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Image.findById(req.params.id, (err, foundImage) => {
      if(err){
        // req.flash("error", "Image not found.");
        res.redirect("back");
      } else {
        if(foundImage.author.id.equals(req.user._id)){
          next();
        } else {
          // req.flash("error", "You dont have permission to do that");
          res.redirect("back");
        }
      }
    });   
  } else {
    // req.flash("error", "You need to be logged in to do that.");
    res.redirect("back");
  }
}

middlewareObj.checkCommentsOwnership = function(req, res, next){
  if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
              res.redirect("back");
          } else {
              //Does user own campground?
              if(foundComment.author.id.equals(req.user._id)){
                  next();
              } else {
                  res.redirect("back");
              }
          }
      });   
  } else {
      req.flash("error", "You dont have permission to do that.");
      res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}


module.exports = middlewareObj;
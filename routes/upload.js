const express = require("express"),
      router  = express.Router({mergeParams: true}),
      path    = require('path'),
      multer = require('multer'),
      Image   = require("../models/images"),
      Comment = require("../models/comment"),
      middleware = require("../middleware/middleware"),
      cloudinary = require('cloudinary');

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter})

cloudinary.config({ 
  cloud_name: 'duyxkp4px', 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

router.get("/", middleware.isLoggedIn, (req, res) => {
  res.render("upload");
})

router.post("/", middleware.isLoggedIn, upload.single('image'), (req, res) => {
  req.body.gram.author = {
    id: req.user._id,
    username:req.user.username
  }
  cloudinary.uploader.upload(req.file.path, (result) => {
    req.body.gram.image = result.secure_url;
    Image.create(req.body.gram, (err, picture) => {
      if (err) {
        return res.redirect('back');
      }
      res.redirect('/gallery/' + picture.id);
    });
  });
})

router.get("/:picId", (req, res) => {
  Image.findById(req.params.picId).populate("comments").exec(function(err, galleryImage){
    if(err) {
      console.log(err);
    } else {
      res.render("show", {galleryImage});
    }
  })
});

router.post("/:picId/comments", middleware.isLoggedIn, (req, res) => {
  Image.findById(req.params.picId, (err, commentPic) => {
    if(err) {
      res.redirect("/gallery");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
            console.log(err);
        } else {
          //Add username and ID to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          //Save Comment
          commentPic.comments.push(comment);
          commentPic.save();        
          // req.flash("success", "Successfully added comment");
          res.redirect("/gallery/" + commentPic._id);
        }
      });
    }
  })
})

router.delete("/:picId/:comment_id", middleware.checkCommentsOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
        res.redirect("back");
        console.log(err);
    } else {
        // req.flash("success", "Comment deleted");
        res.redirect("/gallery/" + req.params.id);
    }
});
})

router.delete("/:picId", (req, res) => {
  Image.findByIdAndRemove(req.params.picId, (err, deletePic) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })
})

router.get("/:id/edit", middleware.checkImageOwnership, function(req, res){
  Image.findById(req.params.id, function(err, foundImage){
      res.render("edit", {image: foundImage});
  });
});

router.put("/:id", middleware.checkImageOwnership, (req, res) => {
  Image.findByIdAndUpdate(req.params.id, req.body.gram, (err, updateImage) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/gallery/" + req.params.id );
    }
  })
})

module.exports = router;
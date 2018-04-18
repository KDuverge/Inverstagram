const express = require('express'),
      router  = express.Router(),
      Image   = require('../models/images'),
      User    = require('../models/user'),
      Comment = require('../models/comment');

router.get("/", (req, res) => {
  Image.find({}, (err, foundImage) => {
    if(err) {
      console.log(err);
    } else {
      console.log(foundImage)
      res.status(200).json(foundImage);
    }
  })
})

router.post("/", (req, res) => {
  Image.findById(req.params.id, (err, newLikes) => {
    if(err) {
      console.log(err);
    } else {
      console.log(newLikes);
    }
  })
})

module.exports = router;
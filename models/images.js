const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  image: String,
  heart: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  description: String,
  author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
      },
       username: String
    },
    comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})

module.exports = mongoose.model("Image", imageSchema);
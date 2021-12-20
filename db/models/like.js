const mongoose = require("mongoose");


const like = new mongoose.Schema({
  like: { type: Boolean, default: false },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


module.exports = mongoose.model("Like", like);

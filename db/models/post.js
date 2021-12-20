const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    desc: { type: String, required: true },
    img: { type: String },
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post);

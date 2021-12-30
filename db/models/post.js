const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, default: "others" },
    duration: { type: String, required: true },
    img: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favourite" }],
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post);

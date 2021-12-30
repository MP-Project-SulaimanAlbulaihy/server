const mongoose = require("mongoose");

const borrow = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    poster_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    note: { type: String },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrow);

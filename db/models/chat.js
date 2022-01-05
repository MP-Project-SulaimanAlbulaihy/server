const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chat);

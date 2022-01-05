const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatTo" }],
    userHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chat);

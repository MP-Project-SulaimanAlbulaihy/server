const mongoose = require("mongoose");

const chatTo = new mongoose.Schema(
  {
        to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: Array },
  },
  { timestamps: true }
);


  (module.exports = mongoose.model("ChatTo", chatTo));

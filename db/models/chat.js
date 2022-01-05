<<<<<<< HEAD
const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
<<<<<<< HEAD
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    content: { type: Array },
=======
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatTo" }],
    userHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chat);
=======
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
>>>>>>> main

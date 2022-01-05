<<<<<<< HEAD
const mongoose = require("mongoose");

const room = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

=======
const mongoose = require("mongoose");

const room = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

>>>>>>> main
module.exports = mongoose.model("Rooms", room);
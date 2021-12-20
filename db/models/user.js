const mongoose = require("mongoose");


const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  role: { type: String, default: "normal-user" },
});


module.exports = mongoose.model("User", user);

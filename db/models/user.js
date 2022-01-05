const mongoose = require("mongoose");


const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  avatar: { type: String, default: "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Image-Transparent-Background.png" },
  isDeleted: { type: Boolean, default: false },
  role: { type: String, default: "normal-user" },
  favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Favourite"}],
});


module.exports = mongoose.model("User", user);

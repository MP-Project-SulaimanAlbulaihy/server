const express = require("express");
const { register, login, logout, registerForAdmin } = require("./../controllers/user");
const auth = require("../auth");

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signup_admin",auth, registerForAdmin);
userRouter.post("/login", login);
userRouter.get("/logout",auth, logout);

module.exports = userRouter;

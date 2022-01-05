const express = require("express");
const { register, login, logout, registerForAdmin, isTokenExpired, updateUser, getUser } = require("./../controllers/user");
const auth = require("../auth");

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signup_admin", auth, registerForAdmin);
userRouter.post("/login", login);
userRouter.get("/get_user", auth, getUser);
userRouter.put("/update_user", auth, updateUser);
userRouter.post("/check_token_expired", isTokenExpired);
userRouter.get("/logout", auth, logout);

module.exports = userRouter;

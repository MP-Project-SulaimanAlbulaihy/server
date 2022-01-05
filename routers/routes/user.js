<<<<<<< HEAD
const express = require("express");
<<<<<<< HEAD
const { register, login, logout, registerForAdmin, isTokenExpired, updateUser, getUser } = require("./../controllers/user");
=======
const { register, login, logout, registerForAdmin, isTokenExpired } = require("./../controllers/user");
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
const auth = require("../auth");

const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/signup_admin", auth, registerForAdmin);
userRouter.post("/login", login);
<<<<<<< HEAD
userRouter.get("/get_user", auth, getUser);
userRouter.put("/update_user", auth, updateUser);
=======
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
userRouter.post("/check_token_expired", isTokenExpired);
userRouter.get("/logout", auth, logout);

module.exports = userRouter;
=======
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
>>>>>>> main

const express = require("express");
<<<<<<< HEAD
const { getUserHistory, updateUserHistory, addMessage, getUserChat } = require("./../controllers/chat");
=======
const { getUserHistory, updateUserHistory, addMessage } = require("./../controllers/chat");
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
const auth = require("../auth");

const chatRouter = express.Router();

<<<<<<< HEAD
chatRouter.get("/get_chat", auth, getUserChat);
chatRouter.get("/get_user_history", auth, getUserHistory);
chatRouter.post("/update_user_history", auth, updateUserHistory);
chatRouter.post("/add_message", auth, addMessage);
=======
chatRouter.get("/get_user_history",auth, getUserHistory);
chatRouter.post("/update_user_history",auth, updateUserHistory);
chatRouter.post("/add_message",auth, addMessage);
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4

module.exports = chatRouter;

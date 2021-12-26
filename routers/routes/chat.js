const express = require("express");
const { getUserHistory, updateUserHistory } = require("./../controllers/chat");
const auth = require("../auth");

const chatRouter = express.Router();

chatRouter.get("/get_user_history",auth, getUserHistory);
chatRouter.post("/update_user_history",auth, updateUserHistory);

module.exports = chatRouter;

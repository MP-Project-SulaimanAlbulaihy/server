const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("./../controllers/comment");
const auth = require("../auth");

const commentRouter = express.Router();

commentRouter.post("/comment/:id", auth, createComment);
commentRouter.put("/comment/:id", auth, updateComment);
commentRouter.delete("/comment/:id", auth, deleteComment);

module.exports = commentRouter;

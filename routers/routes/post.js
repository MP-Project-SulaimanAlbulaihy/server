const express = require("express");
const { getPosts, getPost, createPost, updatePost, deletePost, giveLikeOrRemove, addFavourite } = require("./../controllers/post");
const auth = require("../auth");

const postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.get("/post/:id", getPost);
postRouter.post("/post", createPost);
postRouter.put("/post/:id", auth, updatePost);
postRouter.delete("/post/:id", auth, deletePost);
postRouter.post("/like/:id", auth, giveLikeOrRemove);
postRouter.post("/favourite/:id", auth, addFavourite);

module.exports = postRouter;

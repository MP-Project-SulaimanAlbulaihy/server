const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getFavouritePosts,
  addFavourite,
  deletPost,
} = require("./../controllers/post");
const auth = require("../auth");

const postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.get("/post/:id", getPost);
postRouter.post("/post", auth, createPost);
postRouter.put("/post/:id", auth, updatePost);
postRouter.get("/delete_post/:id", auth, deletPost);
postRouter.delete("/post/:id", auth, deletePost);
postRouter.get("/favourite", auth, getFavouritePosts);
postRouter.get("/favourite/:id", auth, addFavourite);

module.exports = postRouter;

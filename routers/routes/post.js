const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  giveLikeOrRemove,
  addFavourite,
  borrowItem,
  getBorrow,
  waitingApproval,
  waitingAcceptance,
  accept,
  borrowedNow,
  myPosts,
} = require("./../controllers/post");
const auth = require("../auth");

const postRouter = express.Router();

postRouter.get("/posts", getPosts);
postRouter.get("/post/:id", getPost);
postRouter.post("/post", auth, createPost);
postRouter.put("/post/:id", auth, updatePost);
postRouter.delete("/post/:id", auth, deletePost);
postRouter.post("/like/:id", auth, giveLikeOrRemove);
postRouter.post("/favourite/:id", auth, addFavourite);
postRouter.post("/borrow/:id", auth, borrowItem);
postRouter.get("/get_borrow/:id", auth, getBorrow);
postRouter.get("/waiting_approval", auth, waitingApproval);
postRouter.get("/waiting_acceptance", auth, waitingAcceptance);
postRouter.post("/accept_borrow", auth, accept);
postRouter.get("/already_borrowed", auth, borrowedNow);
postRouter.get("/my_posts", auth, myPosts);

module.exports = postRouter;

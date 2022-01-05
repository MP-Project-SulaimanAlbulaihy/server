const express = require("express");
const {
  borrowItem,
  getBorrow,
  waitingApproval,
  waitingAcceptance,
  accept,
  borrowedNow,
  reject,
  myPosts,
  myOffers,
} = require("./../controllers/borrow");
const auth = require("../auth");

const borrowRouter = express.Router();

borrowRouter.post("/borrow/:id", auth, borrowItem);
borrowRouter.get("/get_borrow/:id", auth, getBorrow);
borrowRouter.get("/waiting_approval", auth, waitingApproval);
borrowRouter.get("/waiting_acceptance", auth, waitingAcceptance);
borrowRouter.post("/accept_borrow", auth, accept);
borrowRouter.post("/reject_borrow", auth, reject);
borrowRouter.get("/already_borrowed", auth, borrowedNow);
borrowRouter.get("/my_posts", auth, myPosts);
borrowRouter.get("/my_offers", auth, myOffers);

module.exports = borrowRouter;

const postModel = require("../../db/models/post");
const borrowModel = require("./../../db/models/borrow");


const borrowItem = (req, res) => {
  const { id } = req.params;
  const { note, poster_id, status } = req.body;

  borrowModel
    .findOne({ post: id, user: req.token.id })
    .populate("post")
    .then((result) => {
      if (result) {
        res.status(200).json("You have already requested this item, Check your profile page for updates");
      } else {
        const newBorrowRequest = new borrowModel({
          post: id,
          note,
          status: status == "post" ? "pending" : "offer",
          poster_id,
          user: req.token.id,
        });
        newBorrowRequest
          .save()
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(200).json(err);
          });
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const getBorrow = async (req, res) => {
  const { id } = req.params;

  borrowModel
    .findOne({ post: id, user: req.token.id })
    .then((result) => {
      if (result) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const waitingApproval = async (req, res) => {
  borrowModel
    .find({ status: "pending", user: req.token.id })
    .populate("post")
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(200).json("No Result");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const waitingAcceptance = async (req, res) => {
  borrowModel
    .find({ status: "pending", poster_id: req.token.id })
    .populate("post")
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(200).json("No Result");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const accept = async (req, res) => {
  const { id } = req.body;

  borrowModel
    .findByIdAndUpdate(id, { status: "accepted" })
    .populate("post")
    .then((result) => {
      if (result) {
        res.status(200).json("Accepted");
      } else {
        res.status(200).json("Error");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const borrowedNow = async (req, res) => {
  borrowModel
    .find({ status: "accepted", user: req.token.id })
    .populate("post")
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(200).json("No Result");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const myPosts = async (req, res) => {
  postModel
    .find({ user: req.token.id })
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(200).json("No Result");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const myOffers = async (req, res) => {
  borrowModel
    .find({ user: req.token.id })
    .populate("post")
    .then((result) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(200).json("No Result");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

module.exports = {
  borrowItem,
  getBorrow,
  waitingApproval,
  waitingAcceptance,
  accept,
  borrowedNow,
  myPosts,
  myOffers,
};

const postModel = require("../../db/models/post");
const likeModel = require("../../db/models/like");
const favouriteModel = require("../../db/models/favourite");
const userModel = require("./../../db/models/user");
const borrowModel = require("./../../db/models/borrow");

const getPosts = (req, res) => {
  postModel
    .find({ isDeleted: false })
    .populate({ path: "user favourite", match: { isDeleted: false } })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).json("no posts found");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const getPost = async (req, res) => {
  const { id } = req.params;

  postModel
    .find({ _id: id, isDeleted: false })
    .populate({ path: "user comment like", match: { isDeleted: false } })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json("no post found");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const createPost = (req, res) => {
  const { title, desc, img, category, duration, status } = req.body;
  const newPost = new postModel({ title, desc, img, category, duration, status, user: req.token.id });
  if (!(title && desc)) {
    res.json({ error: "Please fill the title and description" });
  } else {
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  if (req.token.id == user || req.token.role == "admin") {
    postModel
      .findByIdAndUpdate(id, { $set: { isDeleted: true } })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(200).json("post does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  } else {
    res.status(200).json("You don't have privileges to remove this post");
  }
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, desc, img, category, duration, user } = req.body;

  if (req.token.id == user || req.token.role == "admin") {
    postModel
      .findByIdAndUpdate(id, { $set: { title, desc, img, category, duration } })
      .then((result) => {
        if (result) {
          res.status(200).json("post updated");
        } else {
          res.status(404).json("post does not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(200).json("You don't have privileges to remove this post");
  }
};

const giveLikeOrRemove = async (req, res) => {
  const { id } = req.params;
  likeModel
    .findOne({ user: req.token.id, post: id })
    .then((found) => {
      if (found) {
        likeModel
          .findOneAndDelete({ user: req.token.id, post: id })
          .then((data) => {
            postModel
              .findByIdAndUpdate(id, { $pull: { like: data._id } })
              .then(() => {
                res.status(201).json({ result: "removeLike" });
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        const newLike = new likeModel({
          user: req.token.id,
          post: id,
        });
        newLike.save().then((result) => {
          postModel.findByIdAndUpdate(id, { $push: { like: result._id } });
          res.status(201).json({ result: "newLike" });
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addFavourite = async (req, res) => {
  const { id } = req.params;
  favouriteModel
    .findOne({ user: req.token.id, post: id })
    .then((found) => {
      if (found) {
        favouriteModel
          .findOneAndDelete({ user: req.token.id, post: id })
          .then((data) => {
            postModel
              .findByIdAndUpdate(id, { $pull: { favourite: data._id } })
              .then(() => {
                userModel
                  .findByIdAndUpdate(req.token.id, { $pull: { favourite: data._id } })
                  .then(() => {
                    res.status(201).json({ result: "remove favourite" });
                  })
                  .catch((err) => {
                    res.status(400).json(err);
                  });
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        const newFavourite = new favouriteModel({
          user: req.token.id,
          post: id,
        });
        newFavourite.save().then((result) => {
          postModel
            .findByIdAndUpdate(id, { $push: { favourite: result._id } })
            .then(() => {
              userModel
                .findByIdAndUpdate(req.token.id, { $push: { favourite: result._id } })
                .then(() => {
                  res.status(201).json("added favourite");
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

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
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  giveLikeOrRemove,
  addFavourite,
  borrowItem,
  getBorrow,
  waitingApproval,
  waitingAcceptance,
  accept,
  borrowedNow,
  myPosts,
  myOffers,
};

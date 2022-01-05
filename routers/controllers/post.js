const postModel = require("../../db/models/post");
const likeModel = require("../../db/models/like");
const favouriteModel = require("../../db/models/favourite");
const userModel = require("./../../db/models/user");

const getPosts = (req, res) => {
  postModel
    .find({ isDeleted: false, status: { $ne: "borrowed" } })
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

const getPost = (req, res) => {
  const { id } = req.params;

  postModel
    .find({ _id: id, isDeleted: false })
    .populate({ path: "user comment like favourite", match: { isDeleted: false } })
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

const deletePost = (req, res) => {
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
  const { title, desc, img, category, duration } = req.body;

  postModel
    .findByIdAndUpdate(id, { $set: { title, desc, img, category, duration } })
    .then((result) => {
      if (req.token.id == result.user || req.token.role == "admin") {
        res.status(200).json("post updated");
      } else {
        res.status(404).json("post does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addFavourite = (req, res) => {
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
                  res.status(201).json({ result: "added favourite" });
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

const getFavouritePosts = (req, res) => {
  favouriteModel
    .find({ user: req.token.id })
    .populate("post")
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => res.status(400).json(err));
};
const deletPost = (req, res) => {
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(id, {isDeleted: true})
    .then((data) => {
      res.status(200).json('deleted');
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  addFavourite,
  getFavouritePosts,
  deletPost,
};

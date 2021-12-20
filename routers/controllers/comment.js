const commentModel = require("../../db/models/comment");
const postModel = require("../../db/models/post");

const createComment = (req, res) => {
  const { id } = req.params;

  const { comment } = req.body;

  const newComment = new commentModel({
    comment,
    user: req.token.id,
    post: id,
  });
  newComment
    .save()
    .then((result) => {
      postModel.findByIdAndUpdate(id, { $push: { comment: result._id } }).then(() => {
        res.status(201).json("created comment");
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteComment = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  if (req.token.id == user || req.token.role == "admin") {
    commentModel
      .findByIdAndUpdate(id, { $set: { isDeleted: true } })
      .then((result) => {
        if (result) {
          res.status(200).json("comment removed");
        } else {
          res.status(404).json("comment does not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(200).json("You don't have privileges to remove this comment");
  }
};

const updateComment = (req, res) => {
  const { id } = req.params;
  const { comment, user } = req.body;
  if (req.token.id == user || req.token.role == "admin") {
    commentModel
      .findByIdAndUpdate(id, { $set: { comment: comment } })
      .then((result) => {
        if (result) {
          res.status(200).json("comment updated");
        } else {
          res.status(404).json("comment does not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json("you don't have the priveleges to update the comment");
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};

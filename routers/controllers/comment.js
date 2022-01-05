const commentModel = require("../../db/models/comment");
const postModel = require("../../db/models/post");

const getComments = (req, res) => {
  commentModel
    .find({ post: req.body.postID, isDeleted: false })
    .populate("user")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

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
};

const updateComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
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
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComments,
};

const postModel = require("../../db/models/post");
const borrowModel = require("./../../db/models/borrow");
const schedule = require("node-schedule");

const borrowItem = (req, res) => {
  const { id } = req.params;
  const { note, poster_id, status } = req.body;

  borrowModel
    .findOne({ post: id, user: req.token.id })
    .populate("post")
    .then((result) => {
      if (result) {
        res.status(200).json("لقد طلبت هذه السلعة بالفعل، يرجى متابعة الطلب في الملف الشخصي");
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

const getBorrow = (req, res) => {
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

const waitingApproval = (req, res) => {
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

const waitingAcceptance = (req, res) => {
  borrowModel
    .find({ status: "pending", poster_id: req.token.id })
    .populate("post")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const accept = (req, res) => {
  const { id, postID } = req.body;

  borrowModel
    .findByIdAndUpdate(id, { status: "accepted" })
    .populate("post")
    .then((result) => {
      if (result) {
        let timer = 0;
        if (result.post.duration == "دقيقة 30") timer = 1800;
        else if (result.post.duration == 'ساعة') timer = 3600;
        else if (result.post.duration == "ساعتين") timer = 7200;
        else if (result.post.duration == "يوم") timer = 86400;
        else if (result.post.duration == "يومين") timer = 172800;

        postModel.findByIdAndUpdate(postID, { status: "borrowed" }).then(() => {
          const time = new Date(Date.now() + timer);
          const job = schedule.scheduleJob(time, function () {
            console.log("The answer to life, the universe, and everything!");
          });
          res.status(200).json("Accepted");
        });
      } else {
        res.status(200).json("Error");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};
const reject = (req, res) => {
  const { id } = req.body;

  borrowModel
    .findByIdAndUpdate(id, { status: "rejected" })
    .populate("post")
    .then((result) => {
      if (result) {
        res.status(200).json("Rccepted");
      } else {
        res.status(200).json("Error");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const borrowedNow = (req, res) => {
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

const myPosts = (req, res) => {
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

const myOffers = (req, res) => {
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
  reject,
};

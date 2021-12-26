const chatModel = require("./../../db/models/chat");

const getUserHistory = (req, res) => {
  chatModel
    .find({ from: req.token.id })
    .populate("to")
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).json("no chats found");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const updateUserHistory = (req, res) => {
  const { userHistory } = req.body;

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  chatModel
    .findOneAndUpdate({ from: req.token.id }, { $addToSet: { userHistory } }, options)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { getUserHistory, updateUserHistory };

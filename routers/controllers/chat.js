const chatModel = require("./../../db/models/chat");
const chatToModel = require("./../../db/models/chatTo");

const getUserHistory = (req, res) => {
  chatModel
    .find({ from: req.token.id })
    .populate("userHistory to from")
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

const addMessage = (from, to, message) => {  
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    chatToModel
      .findOneAndUpdate({ to: to }, { $push: { content: message } }, options)
      .then((result) => {
        chatModel
        .findOneAndUpdate({ from: from }, { $addToSet: { to: result._id } }, options)
      })
      .catch((err) => {
        console.log('errr ', err);
      });
  };

module.exports = { getUserHistory, updateUserHistory, addMessage };

const chatModel = require("./../../db/models/chat");
const userHistory = require("../../db/models/userHistory");

const getUserChat = (req, res) => {
  chatModel
    .find({ $or: [{from: req.token.id}, {to:req.token.id}] })
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

const getUserHistory = (req, res) => {
  userHistory
    .find({ user: req.token.id })
    .populate("userHistory")
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
  const { newUser } = req.body;

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  userHistory
    .findOneAndUpdate({ user: req.token.id }, { $addToSet: { userHistory:newUser } }, options)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addMessage = (from, to, message, username) => {  
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    chatModel
      .findOneAndUpdate({ from: from, to: to, username:username }, { $push: { content: message } }, options)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log('errr ', err);
      });
  };

module.exports = { getUserHistory, updateUserHistory, addMessage,getUserChat };

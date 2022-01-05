<<<<<<< HEAD
const chatModel = require("./../../db/models/chat");
<<<<<<< HEAD
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
=======
const chatToModel = require("./../../db/models/chatTo");

const getUserHistory = (req, res) => {
  chatModel
    .find({ from: req.token.id })
    .populate("userHistory to from")
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
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
<<<<<<< HEAD
  const { newUser } = req.body;
=======
  const { userHistory } = req.body;
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
<<<<<<< HEAD
  userHistory
    .findOneAndUpdate({ user: req.token.id }, { $addToSet: { userHistory:newUser } }, options)
=======
  chatModel
    .findOneAndUpdate({ from: req.token.id }, { $addToSet: { userHistory } }, options)
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

<<<<<<< HEAD
const addMessage = (from, to, message, username) => {  
=======
const addMessage = (from, to, message) => {  
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
<<<<<<< HEAD
    chatModel
      .findOneAndUpdate({ from: from, to: to, username:username }, { $push: { content: message } }, options)
      .then((result) => {
        console.log(result);
=======
    chatToModel
      .findOneAndUpdate({ to: to }, { $push: { content: message } }, options)
      .then((result) => {
        chatModel
        .findOneAndUpdate({ from: from }, { $addToSet: { to: result._id } }, options)
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
      })
      .catch((err) => {
        console.log('errr ', err);
      });
  };

<<<<<<< HEAD
module.exports = { getUserHistory, updateUserHistory, addMessage,getUserChat };
=======
module.exports = { getUserHistory, updateUserHistory, addMessage };
>>>>>>> 8735e530374f5f5b07de0ee53fe424381b7847e4
=======
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
>>>>>>> main

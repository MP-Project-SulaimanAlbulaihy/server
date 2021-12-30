const chatRoomsModel = require("./db/models/chatRooms");

const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const morgan = require("morgan");
const socket = require("socket.io");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: true, methods: "GET,POST,PUT,DELETE" }));

const userRouter = require("./routers/routes/user");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/comment");
const borrowRouter = require("./routers/routes/borrow");
const chatRouter = require("./routers/routes/chat");
const { addMessage } = require("./routers/controllers/chat");

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(borrowRouter);
app.use(chatRouter);

const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const io = socket(server, { cors: { origin: "*" } });
// io.on("connection", (socket) => {
//   console.log("connection established ");
//   socket.on("message", ({ from, to, message }) => {
//     io.emit("message", { from, to, message });
//   });
// });

// var users = {};
// io.on("connection", (socket) => {
//   console.log('connected ');
//   socket.on("message", (data) => {
//     console.log(users);
//     users[data.to] = socket.id;
//     console.log(users[data.to]);
//     // addMessage(data.from, data.to, data.message)
//     io.to(users[data.to]).emit("message", data);
//   });
// });

let room;
io.on("connection", (socket) => {
  console.log("connected ");
  socket.on("message", (data) => {
    chatRoomsModel.findOne({ $or: [ {$and: [{from: data.from}, {to: data.to}]}, {$and: [{from: data.to}, {to: data.from}]} ]}).then((result) => {
      if (result) {
        room = result._id
        console.log(room);
      } else {
        chatRoomsModel.findOneAndUpdate({ $and: [{from: data.from}, {to: data.to}]}, { from: data.from, to: data.to }, { upsert: true }).then((result) => {
          room = result._id
          console.log(room);
        }).catch(err=>console.log(err));
      }
    }).catch(err=>console.log(err));
    
    // io.to(users[data.to]).emit("message", data);
  });
});

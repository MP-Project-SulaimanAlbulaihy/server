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

io.on("connection", (socket) => {
  console.log("connected ");

  socket.on("joined", (data) => {
    console.log("joined");

    chatRoomsModel
      .findOneAndUpdate(
        { $or: [{ $and: [{ from: data.from }, { to: data.to }] }, { $and: [{ from: data.to }, { to: data.from }] }] },
        { from: data.from, to: data.to },
        { upsert: true, new: true }
      )
      .then((result) => {
        if (result) {
          console.log("joined", result._id);
          room = result._id;
          socket.join(result._id);
        }
      })
      .catch((err) => console.log(err));
  });

  socket.on("message", (data) => {
    addMessage(data.from, data.to, data.message, data.username);
    io.emit("message", data);
  });
});

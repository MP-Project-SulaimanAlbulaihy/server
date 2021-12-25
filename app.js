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

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const io = socket(server, {cors: {origin: "*"}});
io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

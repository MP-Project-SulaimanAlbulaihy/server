const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routers/routes/user");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/comment");

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

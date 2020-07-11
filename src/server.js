const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connetecUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;

  connetecUsers[user] = socket.id;
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  req.connetecUsers = connetecUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

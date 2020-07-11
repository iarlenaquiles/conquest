const express = require("express");
const UserController = require("./controllers/UserController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = express.Router();
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.post("/users/:userId/likes", LikeController.store);
routes.post("/users/:userId/dislikes", DislikeController.store);

module.exports = routes;

const express = require("express");
const server = express();
const configMiddleware = require("./configMiddleware.js");

// router variables
const authRouter = require("./auth/authRouter.js");

configMiddleware(server);

server.get("/", (req, res) => res.send("Server is up and running"));
server.use("/api/users", authRouter);

module.exports = server;

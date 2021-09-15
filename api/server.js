const express = require("express");

const server = express();
const configMiddleware = require("./configMiddleware.js");
const authenticate = require("./middleware/auth-middleware.js");

// router variables
const authRouter = require("./auth/authRouter.js");
const Apps = require("./privateRouters/apps");
const LogoRoutes = require("./privateRouters/logos");
const pr_GraphicRouters = require("./privateRouters/graphics.js");
const portfolioRoutes = require("./publicRouters/portfolioRoutes.js");
const Websites = require("./privateRouters/websites.js");
const EmailApi = require("./publicRouters/emailRoute.js");

configMiddleware(server);

server.get("/", (req, res) => res.send("Server is up and running"));

server.use("/api/email", EmailApi);
server.use("/api/users", authRouter);
server.use("/api", portfolioRoutes);
server.use("/api/auth/websites", authenticate, Websites);
server.use("/api/auth/apps", authenticate, Apps);
server.use("/api/auth/logos", authenticate, LogoRoutes);
server.use("/api/auth/graphics", authenticate, pr_GraphicRouters);

module.exports = server;

const express = require("express");
const nodemailer = require("nodemailer");

const server = express();
const configMiddleware = require("./configMiddleware.js");
const authenticate = require("./middleware/auth-middleware.js");

// router variables
const authRouter = require("./auth/authRouter.js");
const publicProjectRouters = require("./publicRouters/projectRoutes.js");
const publicLogoRouters = require("./publicRouters/logoRoutes.js");
const pr_ProjectRouters = require("./privateRouters/pr_projectRoutes");
const pr_LogoRouters = require("./privateRouters/pr_logoRoute");
const pr_GraphicRouters = require("./privateRouters/pr_graphicRoute.js");

configMiddleware(server);

server.get("/", (req, res) => res.send("Server is up and running"));
server.use("/api/users", authRouter);
server.use("/api/projects", publicProjectRouters);
server.use("/api/logos", publicLogoRouters);
server.use("/api/auth/projects", authenticate, pr_ProjectRouters);
server.use("/api/auth/logos", pr_LogoRouters);
server.use("/api/auth/graphics", pr_GraphicRouters);

// contact email router
server.post("/api/email", (req, res) => {
  const data = req.body;
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: data.email,
    to: process.env.EMAIL_TO,
    subject: "Contact from mohdraza.me",
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>
          `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });
});

module.exports = server;

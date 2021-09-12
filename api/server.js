const express = require("express");
const nodemailer = require("nodemailer");

const server = express();
const configMiddleware = require("./configMiddleware.js");
const authenticate = require("./middleware/auth-middleware.js");

// router variables
const authRouter = require("./auth/authRouter.js");
const publicProjectRouters = require("./publicRouters/projectRoutes.js");
const publicLogoRouters = require("./publicRouters/logoRoutes.js");
const Apps = require("./privateRouters/apps");
const LogoRoutes = require("./privateRouters/logoRoute");
const pr_GraphicRouters = require("./privateRouters/pr_graphicRoute.js");
const portfolioRoutes = require("./publicRouters/portfolioRoutes.js");
const websiteRoutes = require("./privateRouters/websiteRoute.js");

configMiddleware(server);

server.get("/", (req, res) => res.send("Server is up and running"));

server.use("/api/users", authRouter);
server.use("/api", portfolioRoutes);
server.use("/api/auth/website", authenticate, websiteRoutes);
server.use("/api/projects", publicProjectRouters);
server.use("/api/logos", publicLogoRouters);
server.use("/api/auth/projects", authenticate, Apps);
server.use("/api/auth/logos", authenticate, LogoRoutes);
server.use("/api/auth/graphics", authenticate, pr_GraphicRouters);

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
    html: `<p>Name: ${data.name}</p>
          <p>Phone: ${data.telephone}</p>
          <p>Email: ${data.email}</p>
          <p>Message:<br>${data.message}</p>
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

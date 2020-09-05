const express = require("express");
const server = express();
const configMiddleware = require("./configMiddleware.js");

// router variables
const authRouter = require("./auth/authRouter.js");
const publicProjectRouters = require("./publicRouters/projectRoutes.js");
const pr_ProjectRouters = require("./privateRouters/pr_projectRoutes");

configMiddleware(server);

server.get("/", (req, res) => res.send("Server is up and running"));
server.use("/api/users", authRouter);
server.use("/api/projects", publicProjectRouters);
server.use("/api/auth/projects", pr_ProjectRouters);

// contact email router
server.post("/api/email", (req, res) => {
  console.log("data", req.body);

  const data = req.body;
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  const mailOptions = {
    from: data.email,
    to: process.env.email,
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

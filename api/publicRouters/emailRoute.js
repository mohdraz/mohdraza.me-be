const router = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "664772241547-5c3a1j9ngu02ooqbv2mn9se3l1fjhfh3.apps.googleusercontent.com", // client ID
  "-Jz2lmyNxl2fMbt9ySjrzMZc", // client secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04w2Yjdg4bRC2CgYIARAAGAQSNwF-L9IrsuN9NPRo7Sc_qq7VFH2ANVn_CacKzhlm6KVhaWGBQHMU6ahdL-kRcXESv6prKJHdYuc",
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL_TO,
  subject: "mohdraza.me email contact",
  generateTextFromHTML: true,
  html: "<b>test</b>",
};

smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});

// contact email router

router.post("/", (req, res) => {
  const data = req.body;
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: data.email,
    replyTo: data.email,
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

// contact email router
// router.post("/api/email", (req, res) => {
//   const data = req.body;
//   const smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     port: 465,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: data.email,
//     to: process.env.EMAIL_TO,
//     subject: "Contact from mohdraza.me",
//     html: `<p>Name: ${data.name}</p>
//             <p>Phone: ${data.telephone}</p>
//             <p>Email: ${data.email}</p>
//             <p>Message:<br>${data.message}</p>
//             `,
//   };

//   smtpTransport.sendMail(mailOptions, (error, response) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send("Success");
//     }
//     smtpTransport.close();
//   });
// });

module.exports = router;

const router = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // client ID
  process.env.CLIENT_SECRET, // client secret
  process.env.REDIRECT_URL // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

// const smtpTransport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAUTH2",
//     user: process.env.EMAIL,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//     accessToken: accessToken,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const mailOptions = {
//   from: process.env.EMAIL,
//   to: process.env.EMAIL_TO,
//   subject: "mohdraza.me email contact",
//   generateTextFromHTML: true,
//   html: "<b>test</b>",
// };

// smtpTransport.sendMail(mailOptions, (error, response) => {
//   error ? console.log(error) : console.log(response);
//   smtpTransport.close();
// });

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

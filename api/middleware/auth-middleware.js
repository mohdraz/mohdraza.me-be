const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../auth/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // The token is not valid
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    // No token, Not logged in.
    res.status(401).json({ messsage: "Unauthorized access." });
  }
};

const router = require("express").Router();
const bcrypt = require("bcryptjs");

const getToken = require("./getToken.js");
const UsrTbl = require("../../database/models/userModel.js");

router.get("/", (req, res) => {
  UsrTbl.getAllUsers()
    .then((userLists) => {
      res.json(userLists);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting users", err });
    });
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  UsrTbl.addUser(newUser)
    .then((addedUsr) => {
      res.status(201).json(addedUsr);
    })
    .catch((err) => {
      res.status(500).json({ message: "error adding new usr", err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  UsrTbl.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "exception", err });
    });
});

module.exports = router;

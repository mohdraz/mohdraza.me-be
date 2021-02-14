const router = require("express").Router();

const LogoTbl = require("../../database/models/logoModel.js");

router.get("/", (req, res) => {
  LogoTbl.getAllLogos()
    .then((logoList) => {
      res.json(logoList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting Logos", err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  LogoTbl.getLogoById(id)
    .then((logo) => {
      res.send(logo);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

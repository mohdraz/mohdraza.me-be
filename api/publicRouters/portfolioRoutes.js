const router = require("express").Router();

const WebsiteTbl = require("../../database/models/websiteModel.js");

/*================================================= Website Portfolio Route============================ */
router.get("/websites", (req, res) => {
  WebsiteTbl.getAllWebsites()
    .then((websiteList) => {
      res.json(websiteList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting websites", err });
    });
});

router.get("/website/:id", (req, res) => {
  const { id } = req.params;
  WebsiteTbl.getWebsiteById(id)
    .then((website) => {
      res.send(website);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/logos", (req, res) => {
  LogoTbl.getAllLogos()
    .then((logoList) => {
      res.json(logoList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting Logos", err });
    });
});

router.get("/logo/:id", (req, res) => {
  const { id } = req.params;
  LogoTbl.getLogoById(id)
    .then((logo) => {
      res.send(logo);
    })
    .catch((err) => res.status(500).json(err));
});

/*=============================================End of Website Portfolio Route============================ */

module.exports = router;

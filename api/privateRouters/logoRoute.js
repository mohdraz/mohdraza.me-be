const router = require("express").Router();

const LogoTbl = require("../../database/models/logoModel.js");
const { cloudinary } = require("../../utils/cloudinary.js");

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

router.post("/", async (req, res) => {
  const newLogo = req.body;

  // uplaod images to cloudinary and retrieve public_id

  if (newLogo.id) {
    try {
      const uploadedResponse = await cloudinary.uploader.destroy(
        newLogo.oldLogo
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "error deleting image", error: error });
    }
  }

  try {
    const fileStr = newLogo.logo;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "logos",
    });
    newLogo.logo = uploadedResponse.public_id;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error uploaidng image", error: error });
  }

  // end of uploaidng image

  LogoTbl.addLogo(newLogo)
    .then((addedLogo) => {
      res.status(201).json(addedLogo);
    })
    .catch((err) =>
      res.status(500).json({ message: "error adding Logo", err })
    );
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // delete images from cloudinary by passing in  public_id
  try {
    const { logo } = await LogoTbl.getLogoById(id);
    const uploadedResponse = await cloudinary.uploader.destroy(logo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error deleting image", error: error });
  }
  // end of deleting image

  LogoTbl.deleteLogo(id)
    .then((deleted) => {
      res.send(`you have deleted ${deleted} Logos`);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

const router = require("express").Router();

const WebsiteTbl = require("../../database/models/websiteModel.js");
const { cloudinary } = require("../../utils/cloudinary.js");

router.get("/", (req, res) => {
  res.send("Website Auth Routers working");
});

router.post("/", async (req, res) => {
  const newWebsite = req.body;

  if (newWebsite.id && newWebsite.oldImage === newWebsite.image) {
    WebsiteTbl.updateWebsite(newWebsite)
      .then((updatedWebsite) => {
        res.status(200).json(updatedWebsite);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else if (newWebsite.id && newWebsite.oldImage != newWebsite.image) {
    // delete old images from cloudinary by passing in  public_id
    try {
      // const { image } = await WebsiteTbl.getProjectById(id);
      const uploadedResponse = await cloudinary.uploader.destroy(
        newWebsite.oldImage
      );
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ message: "error deleting image", error: error });
    }
    // end of deleting image

    // add the new image to cloudinary
    try {
      const fileStr = newWebsite.image;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "mohdraza.me",
      });
      newWebsite.image = uploadedResponse.public_id;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "error uploaidng image", error: error });
    }
    // end of adding new image

    WebsiteTbl.updateWebsite(newWebsite)
      .then((updatedWebsite) => {
        console.log("updatedWebsite", updatedWebsite);
        res.status(200).json(updatedWebsite);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    try {
      const fileStr = newWebsite.image;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "mohdraza.me",
      });
      newWebsite.image = uploadedResponse.public_id;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "error uploaidng image", error: error });
    }

    // end of uploaidng image

    WebsiteTbl.addWebsite(newWebsite)
      .then((addedProject) => {
        res.status(201).json(addedProject);
      })
      .catch((err) =>
        res.status(500).json({ message: "error adding project", err })
      );
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // delete images from cloudinary by passing in  public_id
  try {
    const { image } = await WebsiteTbl.getWebsiteById(id);
    const uploadedResponse = await cloudinary.uploader.destroy(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error deleting image", error: error });
  }
  // end of deleting image

  WebsiteTbl.deleteWebsite(id)
    .then((deleted) => {
      res.send(`you have deleted ${deleted} projects`);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

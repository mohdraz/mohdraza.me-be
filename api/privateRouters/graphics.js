const router = require("express").Router();

const GraphicTbl = require("../../database/models/graphicModel.js");
const { cloudinary } = require("../../utils/cloudinary.js");

router.get("/", (req, res) => {
  GraphicTbl.getAllGraphics()
    .then((graphicList) => {
      res.json(graphicList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting graphics", err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  GraphicTbl.getGraphicById(id)
    .then((graphic) => {
      res.send(graphic);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/", async (req, res) => {
  const newGraphic = req.body;

  // uplaod images to cloudinary and retrieve public_id

  if (newGraphic.id) {
    try {
      const uploadedResponse = await cloudinary.uploader.destroy(
        newGraphic.oldGraphic
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "error deleting graphic", error: error });
    }
  }

  try {
    const fileStr = newGraphic.graphic;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "graphics",
    });
    newGraphic.graphic = uploadedResponse.public_id;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error uploaidng image", error: error });
  }

  // end of uploaidng image

  GraphicTbl.addGraphic(newGraphic)
    .then((addedGraphic) => {
      res.status(201).json(addedGraphic);
    })
    .catch((err) =>
      res.status(500).json({ message: "error adding graphic", err })
    );
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // delete images from cloudinary by passing in  public_id
  try {
    const { graphic } = await GraphicTbl.getGraphicById(id);
    const uploadedResponse = await cloudinary.uploader.destroy(graphic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error deleting image", error: error });
  }
  // end of deleting image

  GraphicTbl.deleteGraphic(id)
    .then((deleted) => {
      res.send(`you have deleted ${deleted} graphics`);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

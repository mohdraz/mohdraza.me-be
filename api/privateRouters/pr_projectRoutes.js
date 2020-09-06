const router = require("express").Router();

const ProjectTbl = require("../../database/models/projectModel.js");
const { cloudinary } = require("../../utils/cloudinary.js");

router.get("/", (req, res) => {
  ProjectTbl.getAllProjects()
    .then((projectList) => {
      res.json(projectList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting projects", err });
    });
});

router.post("/", async (req, res) => {
  const newProject = req.body;

  // uplaod images to cloudinary and retrieve public_id

  // if (newProject.id) {
  //   const result = await cloudinary.search
  //     .expression((public_id = newProject.image))
  //     .execute();
  //   console.log("result:is: ", result);
  //   if (result.resources.length > 0) {

  //   }
  // }

  try {
    const fileStr = newProject.image;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "mohdraza.me",
    });
    newProject.image = uploadedResponse.public_id;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error uploaidng image", error: error });
  }

  // end of uploaidng image

  ProjectTbl.addProject(newProject)
    .then((addedProject) => {
      res.status(201).json(addedProject);
    })
    .catch((err) =>
      res.status(500).json({ message: "error adding project", err })
    );
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // delete images from cloudinary by passing in  public_id
  try {
    const { image } = await ProjectTbl.getProjectById(id);
    const uploadedResponse = await cloudinary.uploader.destroy(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error deleting image", error: error });
  }
  // end of deleting image

  ProjectTbl.deleteProject(id)
    .then((deleted) => {
      res.send(`you have deleted ${deleted} projects`);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

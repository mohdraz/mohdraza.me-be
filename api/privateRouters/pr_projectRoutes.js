const router = require("express").Router();

const ProjectTbl = require("../../database/models/projectModel.js");
const { route } = require("../auth/authRouter.js");

router.get("/", (req, res) => {
  ProjectTbl.getAllProjects()
    .then((projectList) => {
      res.json(projectList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting projects", err });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  ProjectTbl.addProject(newProject)
    .then((addedProject) => {
      res.status(201).json(addedProject);
    })
    .catch((err) =>
      res.status(500).json({ message: "error adding project", err })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ProjectTbl.deleteProject(id)
    .then((deleted) => {
      res.send(`you have deleted ${deleted} projects`);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

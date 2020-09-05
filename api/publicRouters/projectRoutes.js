const router = require("express").Router();

const ProjectTbl = require("../../database/models/projectModel.js");

router.get("/", (req, res) => {
  ProjectTbl.getAllProjects()
    .then((projectList) => {
      res.json(projectList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting projects", err });
    });
});

module.exports = router;

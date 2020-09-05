const db = require("../dbConfig.js");

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
};

function getAllProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects").where({ id }).first();
}

async function addProject(project) {
  const [id] = await db("projects").insert(project).returning("id");
  return getProjectById(id);
}

const db = require("../dbConfig.js");

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
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

function deleteProject(id) {
  return db("projects").where({ id }).del();
}

async function updateProject(updatedProject) {
  await db("projects")
    .update({
      name: updatedProject.name,
      image: updatedProject.image,
      url: updatedProject.url,
    })
    .where("id", updatedProject.id);
  return getProjectById(updatedProject.id);
}

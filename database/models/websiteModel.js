const db = require("../dbConfig.js");

module.exports = {
  getAllWebsites,
  getWebsiteById,
  addWebsite,
  deleteWebsite,
  updateWebsite,
};

function getAllWebsites() {
  return db("websites");
}

function getWebsiteById(id) {
  return db("websites").where({ id }).first();
}

async function addWebsite(project) {
  const [id] = await db("websites").insert(project).returning("id");
  return getWebsiteById(id);
}

function deleteWebsite(id) {
  return db("websites").where({ id }).del();
}

async function updateWebsite(updatedProject) {
  await db("websites")
    .update({
      name: updatedProject.name,
      image: updatedProject.image,
      url: updatedProject.url,
    })
    .where("id", updatedProject.id);
  return getWebsiteById(updatedProject.id);
}

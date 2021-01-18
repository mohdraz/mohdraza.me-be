const projectData = require("../jsonData/projectList.json");

console.log(`${projectData.length} projects are being inserted`);

const createProject = (project) => {
  return {
    name: project.name,
    image: project.image,
    url: project.url,
  };
};

exports.seed = async function (knex) {
  const projectContainer = [];

  projectData.map((project) => projectContainer.push(createProject(project)));
  await knex("projects").insert(projectContainer);
};

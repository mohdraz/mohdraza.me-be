const projectData = require("../jsonData/projectList.json");

console.log(`${projectData.length} projects are being inserted`);

const createProject = (project) => {
  return {
    name: project.name,
    description: project.description,
    image: project.image,
    demo_url: project.demo_url,
    github_be_url: project.github_be_url,
    github_fe_url: project.github_fe_url,
  };
};

exports.seed = async function (knex) {
  const projectContainer = [];

  projectData.map((project) => projectContainer.push(createProject(project)));
  await knex("projects").insert(projectContainer);
};

const logoData = require("../jsonData/logoList.json");

console.log(`${logoData.length} logos are being inserted`);

const createLogo = (logo) => {
  return {
    logo: logo.logo,
  };
};

exports.seed = async function (knex) {
  const logoContainer = [];

  logoData.map((logo) => logoContainer.push(createLogo(logo)));
  await knex("logos").insert(logoContainer);
};

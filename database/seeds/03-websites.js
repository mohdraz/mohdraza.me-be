const websiteData = require("../jsonData/websiteList.json");

console.log(`${websiteData.length} websites are being inserted`);

const createWebsite = (website) => {
  return {
    name: website.name,
    image: website.image,
    url: website.url,
  };
};

exports.seed = async function (knex) {
  const websiteContainer = [];

  websiteData.map((website) => websiteContainer.push(createWebsite(website)));
  await knex("websites").insert(websiteContainer);
};

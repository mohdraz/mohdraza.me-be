const db = require("../dbConfig.js");

module.exports = {
  getAllLogos,
  getLogoById,
  addLogo,
  deleteLogo,
};

function getAllLogos() {
  return db("logos");
}

function getLogoById(id) {
  return db("logos").where({ id }).first();
}

function deleteLogo(id) {
  return db("logos").where({ id }).del();
}

async function addLogo(newlogo) {
  //   const [id] = await db("logos").insert({ logo: newlogo.logo }).returning("id");
  //   return getLogoById(id);

  if (newlogo.id) {
    // const [id] = await db("logos")
    //   .update({ logo: newlogo.logo })
    //   .where("id", newlogo.id)
    //   .returning("id");

    await deleteLogo(newlogo.id);

    const [id] = await db("logos")
      .insert({ logo: newlogo.logo })
      .returning("id");
    return getLogoById(id);
  } else {
    const [id] = await db("logos")
      .insert({ logo: newlogo.logo })
      .returning("id");
    return getLogoById(id);
  }

  //   if (newlogo.id) {
  //     const [id] = await db("logos")
  //       .update({ logo: newlogo.logo })
  //       .where("id", newlogo.id)
  //       .returning("id");
  //     return getLogoById(id);
  //   } else {
  //     const [id] = await db("logos")
  //       .insert({ logo: newlogo.logo })
  //       .returning("id");
  //     return getLogoById(id);
  //   }
}

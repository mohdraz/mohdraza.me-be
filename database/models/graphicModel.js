const db = require("../dbConfig.js");

module.exports = {
  getAllGraphics,
  getGraphicById,
  addGraphic,
  deleteGraphic,
};

function getAllGraphics() {
  return db("graphics");
}

function getGraphicById(id) {
  return db("graphics").where({ id }).first();
}

function deleteGraphic(id) {
  return db("graphics").where({ id }).del();
}

async function addGraphic(newGraphic) {
  if (newGraphic.id) {
    await deleteGraphic(newGraphic.id);
    const [id] = await db("graphics")
      .insert({ graphic: newGraphic.graphic })
      .returning("id");
    return getGraphicById(id);
  } else {
    const [id] = await db("graphics")
      .insert({ graphic: newGraphic.graphic })
      .returning("id");
    return getGraphicById(id);
  }
}

exports.up = function (knex) {
  return knex.schema.createTable("websites", (tbl) => {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique();
    tbl.string("image", 128);
    tbl.string("url", 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("websites");
};

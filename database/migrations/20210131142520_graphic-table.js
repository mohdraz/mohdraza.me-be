exports.up = function (knex) {
  return knex.schema.createTable("graphics", (tbl) => {
    tbl.increments();
    tbl.string("graphic", 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("graphics");
};

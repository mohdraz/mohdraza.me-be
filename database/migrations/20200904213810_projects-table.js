exports.up = function (knex) {
  return knex.schema.createTable("projects", (tbl) => {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique();
    tbl.string("description", 128);
    tbl.string("image", 128);
    tbl.string("demo_url", 128);
    tbl.string("github_be_url", 128);
    tbl.string("github_fe_url", 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("projects");
};

exports.up = function (knex) {
    return knex.schema.createTable("logos", (tbl) => {
      tbl.increments();
      tbl.string("logo", 128);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("logos");
  };
  
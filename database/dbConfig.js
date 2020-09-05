const knex = require("knex");

const knexConfig = require("../knexfile.js");

const environmnet = process.env.DB_ENV || "development";
module.exports = knex(knexConfig[environmnet]);

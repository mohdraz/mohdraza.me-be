const cleaner = require("knex-cleaner");

exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE users, projects , logos CASCADE");

  // return cleaner.clean(knex, {
  //   mode: 'truncate',
  //   ignoreTables: ['knex_migrations', 'knex_migrations_lock']
  // });
};

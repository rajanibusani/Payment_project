const fs = require('fs');

exports.seed = async function (knex) {
  const sql = fs.readFileSync('src/payments.sql').toString();
  return knex.raw(sql)
};
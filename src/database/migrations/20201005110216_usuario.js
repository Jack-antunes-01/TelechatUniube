exports.up = function (knex) {
  return knex.schema.createTable("session", function (table) {
    table.increments("id");
    table.string("phone_hash");
    table.string("session_string");
    table.string("telefone");
    table.timestamp("data").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("session");
};

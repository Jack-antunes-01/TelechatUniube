exports.up = function (knex) {
  return knex.schema.createTable("mensagens", function (table) {
    table.increments("id");
    table.string("descricao");
    table.timestamp("data").defaultTo(knex.fn.now());
    table.integer("origem");
    table.integer("destino");
    table.timestamp("envio");
    table.timestamp("recebimento");
    table.string("arquivo");
    table.string("ext");
    table.integer("tel_origem");
    table.integer("tel_destino");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mensagens");
};

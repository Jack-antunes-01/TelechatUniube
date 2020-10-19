var environment = "postgre";
var config = require("../config/database")[environment];
module.exports = require("knex")(config);

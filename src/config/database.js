require("dotenv/config");
module.exports = {
  postgres: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: __dirname + "../database/migrations",
    },
    seeds: {
      directory: __dirname + "../database/seeds",
    },
    pool: { min: 2, max: 10 },
  },
};

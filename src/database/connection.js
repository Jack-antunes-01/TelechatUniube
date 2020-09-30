class Connection {
  constructor() {
    this._knexConnection = {};
    this._knex = require("knex");
    this._connections = require("../config/database");
  }

  start() {
    this._knexConnection = Object.keys(this._connections).reduce(
      (knexConnections, connection) => {
        knexConnections = {
          ...knexConnections,
          [connection]: new this._knex(this._connections[connection]),
        };

        return knexConnections;
      },
      {}
    );
  }

  async close() {
    for (const connection of Object.values(this._knexConnection)) {
      await connection.destroy();
    }
  }

  get(name) {
    if (!this._knexConnection[name]) {
      throw new Error("Connection not found");
    }

    return this._knexConnection[name];
  }
}

module.exports = new Connection();

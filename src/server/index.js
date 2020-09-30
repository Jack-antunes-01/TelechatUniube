require("dotenv/config");
const Server = require("express");
const Connection = require("../database/connection");
const Router = require("../routes");

class App {
  constructor() {
    this.app = Server();
    this.port = process.env.PORT || 3333;
    this.signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
  }

  init() {
    // Coloca aqui tudo que precisa ser configurado para iniciar o server
    try {
      Connection.start();

      this.app.use(Router);
    } catch (error) {
      console.error(error);

      process.exit(1);
    }
  }

  start() {
    try {
      this.app.listen(this.port, () => {
        console.log(`Server iniciado na porta ${this.port}`);
      });

      for (const signal of this.signals) {
        process.on(signal, async () => {
          await this.close();
        });
      }
    } catch (error) {
      console.error(error);

      process.exit(1);
    }
  }

  /**
   * @private
   */
  async close() {
    try {
      console.info("Server Desligado");

      await Connection.close();

      process.exit(0);
    } catch (error) {
      console.error(error);

      process.exit(1);
    }
  }
}

module.exports = App;

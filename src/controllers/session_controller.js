const conn = require("../database/connection");
const { TelegramClient } = require("../../gramjs");
const { StringSession } = require("../../gramjs/sessions");
const apiId = process.env.API_ID; // put your api id here [for example 123456789]
const apiHash = process.env.API_HASH; // put your api hash here [for example '123456abcfghe']
const string_session =
  "1AZWarzUBuyeOqOcvMc/dtow6TzZKA7MnORHDleBrppJgNWTyFYfsm/Y6guunETtO5sbe9Jl+thQJK9nCDXdx/eyFiOJF0ro506/qBMITKeL74odPBe+um5JLG9AziwpmP1dU7QrimbaJU+73IUjX5Eho8T7MeEyAecN3Ffuf47nLjrFGm5/xd4PhWlDhBI1uY0CRvyiWkeFoypeVahmcV+Ukk2FcClQDkpKNidg4HzUg/K7qrb6JFT593ZXh1spMNm3QybpdaNRhtEhSX4v82CZitGxwwmZ0d9GNL808n9kcWPe5Z8sIjYmr4SILlIwr6Li2vHUWJVpVB9Hj0xWQ6ZNOWr03r6o=";

require("dotenv/config");

class Session_controller {
  async authCallback(req, res) {
    //await conn.get("postgres").table("mensagens").insert(req.body)
    const client = new TelegramClient(
      new StringSession(string_session),
      apiId,
      apiHash
    );
    // you can pass a string session here from previous logins.
    // If you want to run this example in the test servers uncomment this line
    // client.session.setDC(2, '149.154.167.40', 80)

    client
      .start({
        phone: "",
        password: "",
        code: "",
      })
      .then(() => {
        console.log(
          "%c your string session is " + client.session.save(),
          "color:#B54128"
        );
        console.log(
          "%c you can save it to login with it next time",
          "color:#B54128"
        );
        return res.status(201).json({
          string_session: string_session,
          login: "1",
        });
      });
    //await conn.get("postgres").table("mensagens").insert(req.body);
    //return res.status(201).json(req.body);
  }
}

module.exports = new Session_controller();

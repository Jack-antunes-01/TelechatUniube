const conn = require("../database/connection");
const { TelegramClient } = require("../../gramjs");
const { StringSession } = require("../../gramjs/sessions");
const utils = require("../../gramjs/Utils");
const errors = require("../../gramjs/errors");
const apiId = process.env.API_ID; // put your api id here [for example 123456789]
const apiHash = process.env.API_HASH; // put your api hash here [for example '123456abcfghe']

require("dotenv/config");

class Sign_in_controller {
  async signIn(req, res) {
    let { phone, password } = req.body;
    let phone2;
    //await conn.get("postgres").table("mensagens").insert(req.body)
    const client = new TelegramClient(new StringSession(""), apiId, apiHash);
    // you can pass a string session here from previous logins.
    // If you want to run this example in the test servers uncomment this line
    // client.session.setDC(2, '149.154.167.40', 80)

    function code_callback() {
      code = req.body;
    }

    const db = await conn
      .get("postgres")
      .table("session")
      .select()
      .where("telefone", phone)
      .orderByRaw("id DESC LIMIT 1");
    client._phoneCodeHash[phone] = db[0].phone_hash;
    phone2 = utils.parsePhone(phone) || client._phone;
    client._phone = phone2;

    client
      .start({
        phone,
        code: code_callback(),
        password,
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
      });

    // session_string = client.session.save();

    // await conn
    //   .get("postgres")
    //   .table("session")
    //   .insert({ phone_hash: result.phoneCodeHash, telefone: phone });
    return res.status(201).send(client.session.save());
  }
}

module.exports = new Sign_in_controller();

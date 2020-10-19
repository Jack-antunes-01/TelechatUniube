const conn = require("../database/connection");
const { TelegramClient } = require("../../gramjs");
const { StringSession } = require("../../gramjs/sessions");
const utils = require("../../gramjs/Utils");
const apiId = process.env.API_ID; // put your api id here [for example 123456789]
const apiHash = process.env.API_HASH; // put your api hash here [for example '123456abcfghe']

require("dotenv/config");

class Send_code_controller {
  async authCallback(req, res) {
    let { phone } = req.body;

    //await conn.get("postgres").table("mensagens").insert(req.body)

    const client = new TelegramClient(new StringSession(""), apiId, apiHash);
    // you can pass a string session here from previous logins.
    // If you want to run this example in the test servers uncomment this line
    // client.session.setDC(2, '149.154.167.40', 80)

    if (!client.isConnected()) {
      await client.connect();
    }
    if (await client.isUserAuthorized()) {
      return client;
    }

    phone = utils.parsePhone(phone) || phone;

    let result = await client.sendCodeRequest(phone, "");

    // const teste = await conn
    //   .get("postgres")
    //   .table("session")
    //   .select()
    //   .where("telefone", phone)
    //   .orderByRaw("id DESC LIMIT 1");

    await conn
      .get("postgres")
      .table("session")
      .insert({ phone_hash: result.phoneCodeHash, telefone: phone });

    return res.status(201).json(result);
  }
}

module.exports = new Send_code_controller();

const conn = require("../database/connection");
const apiId = process.env.API_ID; // put your api id here [for example 123456789]
const apiHash = process.env.API_HASH; // put your api hash here [for example '123456abcfghe']
let Logger = require("../../gramjs/extensions").Logger;
const string_session =
  "1AZWarzcBu3u+I7u2bRB/OipaYyovPVGLd2I4V4ypCvokuqWN+r1CxdvdYv32odOfwmfYs+SXka6xwDpXY1KlWvBtHL/ncHpjuZw9/4YE6MJI3hUUxEIcWEDhq/xK8vldOjdqTOj79L9Bovuq0lNiTiPArRwB47xbhnnyJbjR79ZzCy7v+VeTBm/gAKmXa1hjfdtsXCGHZPQOtcJzAsj0U4eCTUPhVgRyMQYCXwJeLZaCOo/7wTDEU9WfkrZcoihgXwg4x2b3fs2+CN9G9D6IPqhuVYBGa/76WCRMhrynApHZ3/o3SL5PoWDmWjZuBgmvPud/0c/HV0knjmuZB8CG1WRTSQbvm2c=";
const { TelegramClient } = require("../../gramjs");
const { StringSession } = require("../../gramjs/sessions");
const { contacts } = require("../../gramjs/tl/functions");
const { functions } = require("../../gramjs/tl");

class Message_controller {
  async salvar(req, res) {
    await conn.get("postgres").table("mensagens").insert(req.body);
    return res.status(201).json(req.body);
  }

  async sendMessage(req, res) {
    const client = new TelegramClient(
      new StringSession(string_session),
      apiId,
      apiHash,
      {
        //baseLogger: new Logger("debug", "info", "warn", "error"),
        baseLogger: new Logger("warn"),
      }
    );
    await client.start();

    let phone = "5534988030842";

    let id;
    let x;
    const teste = await client.invoke(new contacts.GetContactsRequest());

    for (x = 0; x < teste.users.length; x++) {
      if (teste.users[x].phone == phone) {
        id = teste.users[x].id;
        break;
      }
    }

    let peer = await client.getInputEntity(id);

    await client.invoke(
      new functions.messages.SendMessageRequest({
        peer: peer,
        message: req.body.message,
      })
    );

    res.status(201).json(req.body);
  }
}
module.exports = new Message_controller();

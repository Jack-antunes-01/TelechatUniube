const { functions, types } = require("./gramjs/tl");
const { utils } = require("./gramjs/");
const { TelegramClient } = require("./gramjs");
const { StringSession } = require("./gramjs/sessions");
let Logger = require("./gramjs/extensions").Logger;
var readlineSync = require("readline-sync");
const { users, contacts } = require("./gramjs/tl/functions");

const apiId = "1570217"; // put your api id here [for example 123456789]
const apiHash = "6f287efcbd3e7b9a415baba9a778929b"; // put your api hash here [for example '123456abcfghe']

const session =
  "1AZWarzUBuyeOqOcvMc/dtow6TzZKA7MnORHDleBrppJgNWTyFYfsm/Y6guunETtO5sbe9Jl+thQJK9nCDXdx/eyFiOJF0ro506/qBMITKeL74odPBe+um5JLG9AziwpmP1dU7QrimbaJU+73IUjX5Eho8T7MeEyAecN3Ffuf47nLjrFGm5/xd4PhWlDhBI1uY0CRvyiWkeFoypeVahmcV+Ukk2FcClQDkpKNidg4HzUg/K7qrb6JFT593ZXh1spMNm3QybpdaNRhtEhSX4v82CZitGxwwmZ0d9GNL808n9kcWPe5Z8sIjYmr4SILlIwr6Li2vHUWJVpVB9Hj0xWQ6ZNOWr03r6o=";

(async () => {
  const client = new TelegramClient(
    new StringSession(session),
    apiId,
    apiHash,
    {
      //baseLogger: new Logger("debug", "info", "warn", "error"),
      baseLogger: new Logger("warn"),
    }
  );
  await client.start();

  // const result = await client.invoke(
  //   new functions.contacts.GetContactIDsRequest((hash = 0))
  // );
  // for (x = 0; x < result.length; x++) {
  //   console.log(result[x]);
  // }

  // const teste = utils.getPeer(5534988030842, (checkHash = false));
  // const teste2 = utils.getInputPeer(teste, (checkHash = false));
  // console.log(teste2);

  //765528516
  //const peer = await client.getInputEntity(765528516);
  //const peer2 = utils.getInputPeer(5534988030842);
  //client.getInputEntity;
  //const peer = await client.getEntity("5534988030842");

  // console.log(peer);
  let phone = "5534988030842";

  let id;

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
      message: readlineSync.question("Mensagem: "),
    })
  );
})();

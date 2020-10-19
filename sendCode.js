var readlineSync = require("readline-sync");

function phoneCallback() {
  return new Promise((resolve) => {
    var phone = readlineSync.question("Phone number: ");
    resolve(phone);
  });
}

function passwordCallback() {
  return new Promise((resolve) => {
    var pass = readlineSync.question("2FA - Password: ");
    resolve(pass);
    console.log("Connected sucessfully.");
  });
}

function codeCallback() {
  return new Promise((resolve) => {
    var code = readlineSync.question("Telegram login code: ");
    resolve(code);
  });
}

const { TelegramClient } = require("./gramjs");
const { StringSession } = require("./gramjs/sessions");

const apiId = "1570217"; // put your api id here [for example 123456789]
const apiHash = "6f287efcbd3e7b9a415baba9a778929b"; // put your api hash here [for example '123456abcfghe']

//stringSessionCasa: 1AZWarzUBu0NpEhzBwC+UKwV35VY7cPDapgGVFjPjlOlOb6+jkMA3luzOj6VzI72JURGreyewZ7YCv+lxFmL25VGs8hFjzq/K3Co4sM6d90hn2yeipEb9HvCArFCwe4SF3OEIaFUMgc3oBPkQibNJWRJgRpteJK2S5q66Dw0cngjVLWSXT+mbFWvwRxJFGfu0Zwh+ROLSnrtTC3iirmOHAK+VY+/yAyf6pbd9rYsprULBPEGkHuhRMVC4geJxGqz5PxBe1PySBixJCsi7y0o27DPnNwYCzjXbHwdPAwJISkK+1+Jvhjv3jXiSwW1sD+UIEvM/P5+NirY031CY+GqTrHA+xa+sRfA=
//StringSessionUniube: 1AZWarzUBuyeOqOcvMc/dtow6TzZKA7MnORHDleBrppJgNWTyFYfsm/Y6guunETtO5sbe9Jl+thQJK9nCDXdx/eyFiOJF0ro506/qBMITKeL74odPBe+um5JLG9AziwpmP1dU7QrimbaJU+73IUjX5Eho8T7MeEyAecN3Ffuf47nLjrFGm5/xd4PhWlDhBI1uY0CRvyiWkeFoypeVahmcV+Ukk2FcClQDkpKNidg4HzUg/K7qrb6JFT593ZXh1spMNm3QybpdaNRhtEhSX4v82CZitGxwwmZ0d9GNL808n9kcWPe5Z8sIjYmr4SILlIwr6Li2vHUWJVpVB9Hj0xWQ6ZNOWr03r6o=
const client = new TelegramClient(new StringSession(""), apiId, apiHash); // you can pass a string session here from previous logins.
// If you want to run this example in the test servers uncomment this line
// client.session.setDC(2, '149.154.167.40', 80)

client
  .start({
    phone: phoneCallback,
    password: passwordCallback,
    code: codeCallback,
  })
  .then(() => {
    console.log("%c you should now be connected", "color:#B54128");
    console.log(
      "%c your string session is " + client.session.save(),
      "color:#B54128"
    );
    console.log(
      "%c you can save it to login with it next time",
      "color:#B54128"
    );
  });

const Router = require("express").Router();
const Message_controller = require("../controllers/message_controller");
const Send_code_controller = require("../controllers/send_code_controller");
const Session_controller = require("../controllers/session_controller");
const Sign_in_controller = require("../controllers/sign_in_controller");

Router.post("/", Send_code_controller.authCallback);
Router.post("/entrar", Sign_in_controller.signIn);

module.exports = Router;

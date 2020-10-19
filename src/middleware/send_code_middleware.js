var app = express();
const Send_code_controller = require("../controllers/send_code_controller");

app.use(
  "/",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  },
  Send_code_controller.phoneCallback
);

const registration = require("./registration");
const login = require("./login");

const controllerWrapper = require("../../helpers/controllersWrapper");

module.exports = {
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
};

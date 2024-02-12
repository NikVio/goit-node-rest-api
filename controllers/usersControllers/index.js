const registration = require("./registration");
const login = require("./login");
const currentUser = require("./currentUser");
const logoutUser = require("./logoutUser")

const controllerWrapper = require("../../helpers/controllersWrapper");

module.exports = {
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
  currentUser: controllerWrapper(currentUser),
  logoutUser: controllerWrapper(logoutUser),
};

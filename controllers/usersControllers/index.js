const registration = require("./registration");
const login = require("./login");
const currentUser = require("./currentUser");
const logoutUser = require("./logoutUser");
const verifyEmail = require("./verifyEmail");
const resendverifyEmail = require("./resendverifyEmail");

const updateAvatar = require("./updateAvatar");

const controllerWrapper = require("../../helpers/controllersWrapper");

module.exports = {
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
  currentUser: controllerWrapper(currentUser),
  logoutUser: controllerWrapper(logoutUser),
  updateAvatar: controllerWrapper(updateAvatar),
  verifyEmail: controllerWrapper(verifyEmail),
  resendverifyEmail: controllerWrapper(resendverifyEmail),
};

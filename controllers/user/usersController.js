const controllerWrapper = require("../../helpers/controllersWrapper");
const User = require("../../models/users");

const requestError = require("../../helpers/HttpError");

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" });

  if (!user) {
    throw requestError(401, "Not authorized");
  }

  res.status(204).json({
    message: "Logout succes",
  });
};

const currentUser = async (req, res, next) => {
  const { email, _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw requestError(401, "Not authorized");
  }

  res.status(200).json({
    email,
    subscription: "starter",
  });
};

module.exports = {
  logoutUser: controllerWrapper(logoutUser),
  currentUser: controllerWrapper(currentUser),
};

const controllerWrapper = require("../../helpers/controllersWrapper");
const User = require("../../models/users");

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const currentUser = async (req, res, next) => {
  const { email, _id } = req.user;
  await User.findById(_id);

  res.status(200).json({
    email,
    subscription: "starter",
  });
};

module.exports = {
  logoutUser: controllerWrapper(logoutUser),
  currentUser: controllerWrapper(currentUser),
};

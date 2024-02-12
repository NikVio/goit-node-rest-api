const User = require("../../models/usersModel");

const currentUser = async (req, res, next) => {
  const { email, _id } = req.user;
  await User.findById(_id);

  res.status(200).json({
    email,
    subscription: "starter",
  });
};

module.exports = currentUser;

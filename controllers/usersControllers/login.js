const User = require("../../models/usersModel");
const requestError = require("../../helpers/HttpError");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(401, "Email or password is wrong");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw requestError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw requestError(401, "Pleace verify your email");
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;

const User = require("../../models/users");

const bcrypt = require("bcrypt");

const requestError = require("../../helpers/HttpError");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const result = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: result._id,
      email,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw requestError(409, "Email in use");
    }
    throw error;
  }
};

module.exports = registration;

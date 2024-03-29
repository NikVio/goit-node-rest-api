const requestError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return next(requestError(401, "Not authorized"));
  }

  if (!token) {
    return next(requestError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    next(requestError(401, "Not authorized"));
  }
  next();
};

module.exports = authMiddleware;

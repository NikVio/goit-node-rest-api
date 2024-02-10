const requestError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const controllerWrapper = require("../helpers/controllersWrapper");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw requestError(401, "Not authorized");
  }

  if (!token) {
    throw requestError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw requestError(401, "Not authorized");
    }
    throw error;
  }
  next();
};

module.exports = { authMiddleware: controllerWrapper, authMiddleware };

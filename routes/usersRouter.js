const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registration,
  login,
  currentUser,
  logoutUser,
} = require("../controllers/usersControllers/index");

const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/authValidation");

router.post("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);

router.post("/register", validateBody(registerSchema), registration);
router.post("/login", validateBody(loginSchema), login);

module.exports = router;

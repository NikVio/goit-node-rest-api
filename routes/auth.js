const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const controller = require("../controllers/auth");
const userController = require("../controllers/user/usersController");
const validateBody = require("../helpers/validateBody");
const { registerSchema, loginSchema } = require("../schemas/authValidation");

router.post("/logout", authMiddleware, userController.logoutUser);
router.get("/current", authMiddleware, userController.currentUser);

router.post("/register", validateBody(registerSchema), controller.registration);
router.post("/login", validateBody(loginSchema), controller.login);

module.exports = router;

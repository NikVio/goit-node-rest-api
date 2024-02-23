const router = require("express").Router();
const upload = require("../middlewares/uploadImageMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registration,
  login,
  currentUser,
  logoutUser,
  updateAvatar,
  verifyEmail,
  resendverifyEmail,
} = require("../controllers/usersControllers/index");

const validateBody = require("../helpers/validateBody");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../schemas/authValidation");

router.post("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

router.post("/register", validateBody(registerSchema), registration);
router.post("/login", validateBody(loginSchema), login);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateBody(emailSchema), resendverifyEmail);

module.exports = router;

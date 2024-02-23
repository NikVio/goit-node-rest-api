const User = require("../../models/usersModel");
const requstError = require("../../helpers/HttpError");
const sendEmail = require("../../helpers/sendEmail");

const resendverifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requstError(404, "User not found");
  }

  if (user.verify) {
    throw requstError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(mail);
  res.json({ message: "Verification email sent" });
};

module.exports = resendverifyEmail;

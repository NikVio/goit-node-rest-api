const User = require("../../models/usersModel");
const gravatar = require("gravatar");

const bcrypt = require("bcrypt");

const requestError = require("../../helpers/HttpError");
const { nanoid } = require("nanoid");

const sendEmail = require("../../helpers/sendEmail");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  try {
    const result = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify your email</a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
      user: {
        email,
        subscription: result.subscription,
        avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      throw requestError(409, `${email} in use`);
    }
    throw error;
  }
};

module.exports = registration;

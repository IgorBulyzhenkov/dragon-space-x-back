const { User } = require("../db/userModel");
const { NotAuthorizeError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");

dotenv.config({ path: path.resolve("./.env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (name, email) => {
  const msg = {
    to: email,
    from: "bulyzhenkovigor1@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `You are verification token`,
    html: `<h1>Hi ${name}  Please you confirm for registration</h1>
    <button type="button"><a href="http://localhost:3000/verify">Click me</a></button>`,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const registration = async (name, email, password) => {
  const verificationToken = jwt.sign({ token: uuidv4() }, process.env.SECRET);
  const user = new User({ name, email, password, verificationToken });
  await user.save();
  await sendEmail(name, email);
  const userData = await User.findOne({ email, verify: false });

  return userData;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new NotAuthorizeError(`No user with ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizeError("No user with password found");
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  await User.findByIdAndUpdate({ _id: user._id }, { token });
  return { token, user };
};

const logOut = async (user) => {
  return await User.findByIdAndUpdate(
    { _id: user._id },
    { token: null },
    { new: true }
  );
};

const verification = async (token) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new NotAuthorizeError(`No user with found`);
  }

  const msg = {
    to: user.email,
    from: "bulyzhenkovigor1@gmail.com",
    subject: "Thank`s",
    text: `Thank you for registration`,
    html: `<h1>Thank you for registration</h1>`,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  const newToken = jwt.sign({ _id: user._id }, process.env.SECRET);

  return await User.findByIdAndUpdate(
    { _id: user._id },
    { verificationToken: null, verify: true, token: newToken },
    { new: true }
  );
};

const verifyService = async (email) => {
  const user = await User.findOne({ email: email, verify: false });

  if (!user) {
    throw new NotAuthorizeError(`No user with found`);
  }

  await sendEmail(email, user.verificationToken);

  return user;
};

module.exports = {
  registration,
  login,
  logOut,
  verification,
  verifyService,
};

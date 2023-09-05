const {
  registration,
  login,
  logOut,
  verification,
  verifyService,
} = require("../services/AuthServices");

const registrationControls = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const data = await registration(name, email, password);

    return res.status(201).json({
      user: {
        name: data.name,
        email: data.email,
        verificationToken: data.verificationToken,
        verify: data.verify,
      },
    });
  } catch (error) {
    return res.status(409).json({ message: "Email in use" });
  }
};

const loginControls = async (req, res, next) => {
  const { email, password } = req.body;
  const { token, _id, name } = await login(email, password);

  if (name) {
    return res.status(200).json({
      token,
      id: _id,
      name,
      email,
    });
  }
};

const logoutControls = async (req, res, next) => {
  const tokenIdUser = await logOut(req.user);
  if (tokenIdUser) {
    return res.status(204).json("No Content");
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

const verificationControl = async (req, res, next) => {
  try {
    const { token, _id, name, email } = await verification(
      req.params.verificationToken
    );

    res.status(200).json({
      token,
      id: _id,
      name,
      email,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const verifyControls = async (req, res, next) => {
  const user = await verifyService(req.body.email);

  if (!user) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  return res.status(200).json({ message: "Verification email sent" });
};

const currentControls = async (req, res, next) => {
  const { token, _id, name, email } = req.user;
  if (name) {
    return res.status(200).json({ token, id: _id, name, email });
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  registrationControls,
  loginControls,
  logoutControls,
  verificationControl,
  verifyControls,
  currentControls,
};

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
  const { user, token } = await login(email, password);

  if (user) {
    return res.status(200).json({
      token: token,
      user: {
        name: user.name,
      },
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
    const data = await verification(req.params.verificationToken);
    console.log(data);
    res.status(200).json({
      user: {
        name: data.name,
        token: data.token,
      },
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
  const dataId = req.user;
  if (dataId) {
    const { name, token } = dataId;
    return res.status(200).json({ name, token });
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

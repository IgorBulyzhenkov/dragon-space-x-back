const jwt = require("jsonwebtoken");
const { NotAuthorizeError } = require("../helpers/errors");
const { User } = require("../db/userModel");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");

    if (!token) {
      next(new NotAuthorizeError("Please, provide is token"));
    }
    const decodeJwt = jwt.decode(token, process.env.SECRET);
    const user = await User.findOne({ _id: decodeJwt._id });
   
    if (!user) {
      next(new NotAuthorizeError("Not authorized"));
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizeError("Not authorized"));
  }
};

module.exports = { authMiddleware };

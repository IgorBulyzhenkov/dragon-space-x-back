const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  loginControls,
  registrationControls,
  logoutControls,
  verificationControl,
  verifyControls,
  currentControls,
} = require("../../Controls/AuthControll");
const router = new express.Router();
const {
  validateAuth,
  validateVerify,
  validateLogin,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/AuthMiddleware");

router.get("/verify/:verificationToken", asyncWrapper(verificationControl));

router.post("/register", validateAuth, asyncWrapper(registrationControls));

router.post("/login", validateLogin, asyncWrapper(loginControls));

router.post("/logout", authMiddleware, asyncWrapper(logoutControls));

router.post("/verify", validateVerify, asyncWrapper(verifyControls));

router.get("/current", authMiddleware, asyncWrapper(currentControls));

module.exports = router;

const mongoose = require("mongoose");
const { userSchema } = require("./schema");

const User = mongoose.model("users", userSchema);

module.exports = { User };

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const contactsRouter = require("./src/routes/api/contacts");
const UsersRouter = require("./src/routes/api/userAuth");
// const avatarRouter = require("./src/routes/api/avatars");
const morgan = require("morgan");
const { errorHandler } = require("./src/helpers/apiHelpers");
//
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// app.use("/api/contacts", contactsRouter);
app.use("/api/users", UsersRouter);
// app.use("/avatars", avatarRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;

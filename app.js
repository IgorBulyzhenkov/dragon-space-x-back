const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const UsersRouter = require("./src/routes/api/userAuth");
const morgan = require("morgan");
const { errorHandler } = require("./src/helpers/apiHelpers");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const allowedOrigins = ["https://app.example.com", "https://example.com"];

// check origin
var corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NETLIFY_DEV === "true" || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/users", UsersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;

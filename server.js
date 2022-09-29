const app = require("./app");
require("dotenv").config();
const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
start();

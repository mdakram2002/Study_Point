
const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connection established"))
    .catch((err) => {
      console.error("DB Connection Failed", err);
      process.exit(1);
    });
};

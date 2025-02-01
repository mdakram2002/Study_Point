/** @format */

const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection established"))
    .catch((err) => {
      console.error(err);
      console.log("DB Connection Failed");
      process.exit(1);
    });
};

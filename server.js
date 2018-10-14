const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const Data = require("./data");

// Load configuration from .env file. Exit if any error occurs
const { error } = dotenv.config();
if (error) {
  console.error(error);
  process.exit(1);
}

(async function connectToDatabase() {
  // connects our back end code with the database
  const { DB_USER, DB_HOST, DB_PORT, DB_NAME } = process.env;
  const dbRoute = `mongodb://${DB_USER}:${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  try {
    await mongoose.connect(
      dbRoute,
      { useNewUrlParser: true }
    );
    console.log("connected to the database");
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
  }

  const app = express();
  // (optional) only made for logging and
  // bodyParser, parses the request body to be a readable json format
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(logger("dev"))
    // Define routes here
    .get("/status", (req, res) => {
      res.send("Web server is up and running");
    })
    .listen(process.env.PORT);
})();

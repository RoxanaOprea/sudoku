const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://<user>:<password>@<host>:<port>/<database>";

(async () => {
  // connects our back end code with the database
  try {
    await mongoose.connect(
      dbRoute,
      { useNewUrlParser: true }
    );
    console.log("connected to the database");
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
  }

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
    .listen(4000);
})();

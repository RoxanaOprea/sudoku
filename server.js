const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const uuid = require("uuid");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const User = require("./data");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const bcrypt = require("bcrypt-nodejs");
const util = require('util');
const jwt = require('jsonwebtoken');
const config = require('./config');


// Load configuration from .env file. Exit if any error occurs
const { error } = dotenv.config();
if (error) {
  console.error(error);
  process.exit(1);
}

(async function connectToDatabase() {
  // connects our back end code with the database
  const { DB_HOST, DB_PORT, DB_NAME } = process.env;
  const dbRoute = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
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
  // add & configure middleware
  app.use(
    session({
      genid: req => {
        console.log("Inside session middleware genid function");
        console.log(`Request object sessionID from client: ${req.sessionID}`);
        return uuid(); // use UUIDs for session IDs
      },
      store: new FileStore(),
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  // (optional) only made for logging and
  // bodyParser, parses the request body to be a readable json format
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(logger("dev"))


  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log({ email, password });

    const newUser = new User({ email, password });
    newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send(JSON.stringify(newUser));
    });
  })

  app.post("/login", (req, res, next) => {
    console.log("Inside POST /login callback");
    passport.authenticate("local", (err, user, info) => {
      console.log("Inside passport.authenticate() callback");
      req.login(user, err => {
        console.log(user);
        return res.send('Autentificare cu succes');
      });
    })(req, res, next);
  });

  app.get("/authrequired", (req, res) => {
    console.log("Inside GET /authrequired callback");
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
      res.send("you hit the authentication endpoint\n");
    } else {
      res.redirect("/");
    }
  });

  app.listen(process.env.PORT);
})();

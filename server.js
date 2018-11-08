const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const User = require("./data");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const jwtValidator = require("express-jwt");
const jwt = require("jsonwebtoken");
const config = require("./config");

// Load configuration from .env file. Exit if any error occurs
const { error } = dotenv.config();
if (error) {
  console.log(error);
  process.exit(1);
}

// configure passport.js to use the local strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email, password }, function(err, user) {
      done(err, user);
    });
  })
);

async function connectToDatabase(callback) {
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
  // bodyParser, parses the request body to be a readable json format
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(logger("dev"))
    .use(passport.initialize())
    .use(
      jwtValidator({ secret: config.secret }).unless({
        path: ["/login", "/register"]
      })
    )
    .use(function(err, req, res, next) {
      if (err.name === "UnauthorizedError") {
        return res.status(401).send("Invalid token");
      }
      next();
    })
    .use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });

  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({ email, password  });

    newUser.save((err, savedUser) => {
      if (err) {
        return res.sendStatus(500);
      }
      return res.send(newUser);
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
      const token = jwt.sign(
        JSON.parse(JSON.stringify(req.user)),
        config.secret
      );
      res.send({ user: req.user, token });
    }
  );

  app.get("/authrequired", (req, res) => {
    // console.log(`User authenticated? ${req.isAuthenticated()}`);
    res.send({ authenticated: req.isAuthenticated() });
  });

  
  var server = app.listen(process.env.PORT, function () {
    console.log('started');

    if (callback) {
        callback();
    }
  });

  server.on('close', function () {
      console.log('closed');
  });

  return server;
};

if (require.main === module) {
  connectToDatabase();
}

exports.connectToDatabase = connectToDatabase;

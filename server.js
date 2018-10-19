const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const router = express.Router();
const uuid = require("uuid");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const bcrypt = require("bcrypt-nodejs");
const util = require('util');
const User = require("../data");
const jwt = require('jsonwebtoken');
const config = require('./config');

const users = [{ id: "2f24vvg", email: "test@test.com", password: "password" }];

// configure passport.js to use the local strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    axios
      .get(`http://localhost:3001/users?email=${email}`)
      .then(res => {
        const user = res.data[0];
        if (!user) {
          return done(null, false, { message: "Invalid credentials.\n" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid credentials.\n" });
        }
        return done(null, user);
      })
      .catch(error => done(error));
  })
);

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  axios
    .get(`http://localhost:3001/users/${id}`)
    .then(res => done(null, res.data))
    .catch(error => done(error, false));
});

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

    // create the homepage route at '/'
    .get("/", (req, res) => {
      res.send(`You hit home page!\n`);
    });

  // create the login get and post routes
  app.get("/login", (req, res) => {
    res.send(`You got the login page!\n`);
  });

  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.save((err, savedUser) => {
      if(err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send(0);
    })
  })

  app.post("/login", (req, res, next) => {
    console.log("Inside POST /login callback");
    passport.authenticate("local", (err, user, info) => {
      console.log("Inside passport.authenticate() callback");
      console.log(
        `req.session.passport: ${JSON.stringify(req.session)}`
      );
      console.log(`RES: ${util.inspect(req)}`);
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      req.login(user, err => {
        console.log("Inside req.login() callback");
        console.log(
          `req.session.passport: ${JSON.stringify(req.session.passport)}`
        );
        console.log(`req.user: ${JSON.stringify(req.user)}`);
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

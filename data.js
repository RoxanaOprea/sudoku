// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// this will be our data base's data structure 

// UserSchema
const UserSchema = new Schema(
  {
    email: {
      type: String, 
      required: true
    }, 
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);
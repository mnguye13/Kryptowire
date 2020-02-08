const express = require("express");
const mongoose = require("mongoose");
const Controller = require("./controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/env");
const ObjectId = mongoose.Types.ObjectId;

class UserController extends Controller {
  createUser(data, callback) {
    try {
      this.DBModel.findOne({ email: data.email }).then(user => {
        if (user)
          return callback({ status: 400, message: "Email already exist" });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) return callback(err);
          bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) return callback(err);
            data.password = hash;
            this.DBModel.create(data, (err, res) => {
              callback(err, res);
            });
          });
        });
      });
    } catch (err) {
      callback(err, null);
    }
  }

  findUser(data, callback) {
    try {
      const email = data.email;
      const password = data.password;
      this.DBModel.findOne({ email: email }).then(user => {
        if (!user) return callback({ status: 400, message: "user not found" });
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch)
            return callback({ status: 400, message: "User not Found" });
          const payload = {
            id: user._id,
            name: user.name
          };
          jwt.sign(
            payload,
            config.SECRET,
            {
              expiresIn: 3600
            },
            (err, token) => {
              callback(null, { success: true, token: token });
            }
          );
        });
      });
    } catch (err) {
      callback(err);
    }
  }

  find(id, callback) {
    this.DBModel.findOne({ _id: ObjectId(id) }, (err, res) => {
      let newRes = new Object();
      newRes.id = res._id;
      newRes.name = res.name;
      newRes.email = res.email;

      callback(err, newRes);
    });
  }
}
module.exports = UserController;

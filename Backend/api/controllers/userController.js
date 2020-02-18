const express = require("express");
const mongoose = require("mongoose");
const Controller = require("./controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/env");
const ObjectId = mongoose.Types.ObjectId;

class UserController extends Controller {
  async createUser(data, callback) {
    try {
      const user = await this.DBModel.findOne({ email: data.email });
      if (user)
        return callback({ status: 400, message: "Email already exist" });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
      const res = await this.DBModel.create(data);
      callback(null, res);
    } catch (err) {
      callback(err, null);
    }
  }

  async findUser(data, callback) {
    try {
      const email = data.email;
      const password = data.password;
      const user = await this.DBModel.findOne({ email: email });
      if (!user) return callback({ status: 400, message: "user not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return callback({ status: 400, message: "User not Found" });
      const payload = { id: user._id, name: user.name };
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
    } catch (err) {
      callback(err);
    }
  }

  async find(id, callback) {
    try {
      const res = await this.DBModel.findOne({ _id: ObjectId(id) });
      const newRes = new Object();
      newRes.id = res._id;
      newRes.name = res.name;
      newRes.email = res.email;

      callback(null, newRes);
    } catch (err) {
      callback(err);
    }
  }
}
module.exports = UserController;

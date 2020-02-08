const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/env");
const validateRegisterInput = require("../../validation/register");
const vaildateLoginInput = require("../../validation/login");
const User = require("../models/user");

const Controller = require("../controllers/userController");
const userController = new Controller(User);

router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  userController.createUser(req.body, (error, result) => {
    handleCallBack(error, result, res);
  });
});

router.post("/login", (req, res, next) => {
  const { errors, isValid } = vaildateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  userController.findUser(req.body, (error, result) => {
    handleCallBack(error, result, res);
  });
});

router.get("/:id", (req, res, next) => {
  userController.find(req.params.id, (error, result) => {
    handleCallBack(error, result, res);
  });
});

let handleCallBack = (error, result, response) => {
  console.log("error: " + JSON.stringify(error));
  console.log("result: " + JSON.stringify(result));

  if (error) return response.status(500).json({ error: error });
  return response.status(200).json(result);
};
/*

// @route POST /register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      //Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  //Form validator

  const { errors, isValid } = vaildateLoginInput(req.body);

  //Check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email

  User.findOne({ email }).then(user => {
    //check if user exist
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          payload,
          config.SECRET,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password incorrect" });
      }
    });
  });
});
*/
module.exports = router;

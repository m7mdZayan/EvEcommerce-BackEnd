const express = require("express");
const mongoose = require("mongoose");
const { User, validateUser } = require("../models/User");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

// Get all users
userRouter.get("/", async (req, res) => {
  const users = await User.find().select("-_id -password");

  res.send(users);
});

// User Registeration
userRouter.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ message: "user already registered." });

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

// Lock & unlock user account

userRouter.put("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  user.disabled = !user.disabled;

  user = await user.save();
  res.send(user);
});

module.exports = userRouter;

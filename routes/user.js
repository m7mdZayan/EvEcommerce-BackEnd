const express = require("express");
const mongoose = require("mongoose");
const { User, validateUser } = require("../models/User");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();

  res.send({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = userRouter;

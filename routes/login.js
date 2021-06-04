const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = express.Router();
const joi = require("joi");
const { User } = require("../models/User");

loginRouter.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid Email Or Password." });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send({ message: "Invalid Email Or Password." });

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    "JWTPRIVATEKEY"
  );

  res.send({
    userToken: token,
    userName: user.name,
  });
});

function validate(req) {
  const schema = joi.object({
    email: joi.string().required().min(8).max(100),
    password: joi.string().min(5).max(25).required(),
  });

  return schema.validate(req);
}

module.exports = loginRouter;

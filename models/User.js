const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    email: joi.string().required().min(8).max(100),
    password: joi.string().min(5).max(25).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;

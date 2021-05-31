const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name!"],
  },
  photo: String,
  price: { type: Number, required: [true, "please enter the price "] },
  description: {
    type: String,
    required: [true, "Please describe the product "],
  },
  amount: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  sub_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    photo: Joi.string().allow(""),
    price: Joi.number().required(),
    description: Joi.string().min(1).required(),
    amount: Joi.number().required(),
    category: Joi.string(),
    sub_category: Joi.string(),
  });
  return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, validateProduct };

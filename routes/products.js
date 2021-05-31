const express = require("express");
const { SubCategory } = require("../models/Category");
const { Product, validateProduct } = require("../models/Product");
const productsRouter = express.Router();

// Get all products
productsRouter.get("/", async (req, res) => {
  const products = await Product.find()
    .populate("sub_category", "name")
    .populate("category", "name");

  res.send(products);
});

// Add New Product

productsRouter.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    amount: req.body.amount,
    sub_category: req.body.sub_category,
    category: req.body.category,
  });

  product = await product.save();
  res.send(product);
});

module.exports = productsRouter;

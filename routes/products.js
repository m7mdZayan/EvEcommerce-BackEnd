const express = require("express");
const { Product, validateProduct } = require("../models/Product");
const productsRouter = express.Router();

// Get all products
productsRouter.get("/", async (req, res) => {
  const products = await Product.find();

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
  });

  product = await product.save();
  res.send(product);
});

module.exports = productsRouter;

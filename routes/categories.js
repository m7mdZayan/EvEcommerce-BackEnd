const express = require("express");
const { Category } = require("../models/Category");
const categoriesRouter = express.Router();

// Get all categories
categoriesRouter.get("/", async (req, res) => {
  const categories = await Category.find();

  res.send(categories);
});

// Add New Category

categoriesRouter.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    details: req.body.details,
  });

  category = await category.save();
  res.send(category);
});

// Delete Category

categoriesRouter.delete("/", async (req, res) => {
  const result = await Category.deleteOne({ _id: req.body.id });
  res.send(result);
});

module.exports = categoriesRouter;

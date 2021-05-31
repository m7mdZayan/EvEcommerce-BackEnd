const express = require("express");
const { SubCategory } = require("../models/Category");
const subCategoriesRouter = express.Router();

// Get all sub-categories
subCategoriesRouter.get("/", async (req, res) => {
  const subCategories = await SubCategory.find().populate("parent_category");

  res.send(subCategories);
});

// Add New Sub-category

subCategoriesRouter.post("/", async (req, res) => {
  let subCategory = new SubCategory({
    name: req.body.name,
    details: req.body.details,
    parent_category: req.body.parentId,
  });

  subCategory = await subCategory.save();
  res.send(subCategory);
});

// Delete Sub Category

subCategoriesRouter.delete("/", async (req, res) => {
  const result = await SubCategory.deleteOne({ _id: req.body.id });
  res.send(result);
});

module.exports = subCategoriesRouter;

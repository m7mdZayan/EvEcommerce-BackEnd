const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  details: String,
});

const Category = mongoose.model("Category", categorySchema);

const subCategorySchema = new mongoose.Schema({
  name: String,
  details: String,
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = { Category, SubCategory };

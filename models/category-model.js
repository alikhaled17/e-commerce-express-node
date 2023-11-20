const mongoose = require("mongoose");

// 1- Create schema
const CategorySchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Category title required!"],
      unique: [true, "Category is exist!"],
      minLength: [3, "Too short category name!"],
      maxLength: [50, "Too long category name!"],
    },
    Slug: {
      type: String,
      lowercase: true,
    },
    Image: String,
  },
  { timestamps: true }
);
// 2- Create model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;

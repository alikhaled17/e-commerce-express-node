const mongoose = require("mongoose");

// 1- Create schema
const SubcategorySchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Subcategory title required!"],
      unique: [true, "Subcategory is exist!"],
      minLength: [3, "Too short subcategory name!"],
      maxLength: [50, "Too long subcategory name!"],
    },
    Slug: {
      type: String,
      lowercase: true,
    },
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Subcategory must be belong to parent category!"],
    },
  },
  { timestamps: true }
);

// 2- Create model
const SubcategoryModel = mongoose.model("Subcategory", SubcategorySchema);

module.exports = SubcategoryModel;

const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Product title is required!"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    Slug: { type: String, required: true, lowercase: true, trim: true },
    Descreption: {
      type: String,
      required: [true, "Product description is required!"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    Quantity: {
      type: Number,
      required: [true, "Product quantity is required!"],
    },
    Sold: {
      type: Number,
      default: 0,
    },
    Price: {
      type: Number,
      required: [true, "Product price is required!"],
      max: [10, "Too high!"],
      trim: true,
    },
    PriceAfterDiscount: {
      type: Number,
      max: [10, "Too high!"],
    },
    Colors: [String],
    ImageThumb: { type: String, required: true },
    Images: [String],
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to parent category!"],
    },
    Subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
      },
    ],
    Brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    RatingAverage: {
      type: Number,
      min: [1, "Rating must be above or equal to 1.0"],
      max: [5, "Rating must be below or equal to 5.0"],
    },
    RatingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;

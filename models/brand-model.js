const mongoose = require("mongoose");

// 1- Create schema
const BrandSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Brand title required!"],
      unique: [true, "Brand is exist!"],
      minLength: [3, "Too short Brand name!"],
      maxLength: [50, "Too long Brand name!"],
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
const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/product-model");

// @desc   Get list of products
// @route  GET /api/v1/products ?queryParam
// @access public
exports.getAll = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const data = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(201).send({ results: data.length, page, data, success: true });
});

// @desc   Get product by id
// @route  GET /api/v1/products/:id
// @access public
exports.getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    res.status(404).json({ msg: `No product for this id ${id}` });
  }
  res.status(201).json({ data: product });
});

// @desc   Create new product
// @route  POST /api/v1/products
// @access private
exports.create = asyncHandler(async (req, res) => {
  req.body.Slug = slugify(req.body.Title);
  const newProduct = await ProductModel.create(req.body);
  res.status(201).json({ data: newProduct, success: true });
});

// @desc   Update product by id
// @route  PUT /api/v1/products/:id
// @access private
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  req.body.Slug = slugify(req.body.Title);
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    res.status(404).json({ msg: `No product for this id ${id}` });
  }
  res.status(201).json({ data: product, success: true });
});

// @desc   Delete product by id
// @route  DELETE /api/v1/products/:id
// @access private
exports.remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findOneAndDelete(id);
  if (!product) {
    res.status(404).json({ msg: `No product for this id ${id}` });
  }
  res.status(201).json({ msg: "Product has been deleted!", success: true });
});

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../models/brand-model");

// @desc   Get list of categories
// @route  GET /api/v1/categories ?queryParam
// @access public
exports.getAll = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const data = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(201).send({ results: data.length, page, data, success: true });
  
});

// @desc   Get brand by id
// @route  GET /api/v1/categories/:id
// @access public
exports.getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    res.status(404).json({ msg: `No brand for this id ${id}` });
  }
  res.status(201).json({ data: brand });
});

// @desc   Create new brand
// @route  POST /api/v1/categories
// @access private
exports.create = asyncHandler(async (req, res) => {
  const { Title } = req.body;
  const newBrand = await BrandModel.create({
    Title,
    Slug: slugify(Title),
  });
  res.status(201).json({ data: newBrand, success: true });
});

// @desc   Update brand by id
// @route  PUT /api/v1/categories/:id
// @access private
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Title } = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { Title, Slug: slugify(Title) },
    { new: true }
  );
  if (!brand) {
    res.status(404).json({ msg: `No brand for this id ${id}` });
  }
  res.status(201).json({ data: brand, success: true });
});

// @desc   Delete brand by id
// @route  DELETE /api/v1/categories/:id
// @access private
exports.remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await BrandModel.findOneAndDelete(id);
  if (!brand) {
    res.status(404).json({ msg: `No brand for this id ${id}` });
  }
  res.status(201).json({ msg: "Brand has been deleted!", success: true });
});

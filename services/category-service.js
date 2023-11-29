const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/category-model");

// @desc   Get list of categories
// @route  GET /api/v1/categories ?queryParam
// @access public
exports.getAll = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const data = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(201).send({ results: data.length, page, data, success: true });

});

// @desc   Get category by id
// @route  GET /api/v1/categories/:id
// @access public
exports.getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(201).json({ data: category });
});

// @desc   Create new category
// @route  POST /api/v1/categories
// @access private
exports.create = asyncHandler(async (req, res) => {
  const { Title } = req.body;
  const newCategory = await CategoryModel.create({
    Title,
    Slug: slugify(Title),
  });
  res.status(201).json({ data: newCategory, success: true });
});

// @desc   Update category by id
// @route  PUT /api/v1/categories/:id
// @access private
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Title } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { Title, Slug: slugify(Title) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(201).json({ data: category, success: true });
});

// @desc   Delete category by id
// @route  DELETE /api/v1/categories/:id
// @access private
exports.remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findOneAndDelete(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(201).json({ msg: "Category has been deleted!", success: true });
});

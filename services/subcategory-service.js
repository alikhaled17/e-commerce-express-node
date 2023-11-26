const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubcategoryModel = require("../models/subcategory-model");

// middleware for creating filter object to request body data
exports.createFilterObgToBody = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { Category: req.params.categoryId };
  }
  req.filterObj = filterObject;
  next();
};
// @desc   Get list of subcategories
// @route  GET /api/v1/subcategories ?queryParam
// @access public
exports.getAll = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const data = await SubcategoryModel.find(req.filterObj)
    .skip(skip)
    .limit(limit)
    .populate({ path: "Category", select: "Title" }); // populate with select to get category title and category_id
  res.status(201).send({ results: data.length, page, data, success: true });
});

// @desc   Get category by id
// @route  GET /api/v1/subcategories/:id
// @access public
exports.getOne = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await SubcategoryModel.findById(id).populate("Category"); // populate with name to get category details
  if (!category) {
    res.status(404).json({ msg: `No subcategory for this id ${id}` });
  }
  res.status(201).json({ data: category });
});

// middleware for setting category id to request body data
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.Category) req.body.Category = req.params.categoryId;
  next();
};
// @desc   Create new category
// @route  POST /api/v1/subcategories
// @access private
exports.create = asyncHandler(async (req, res) => {
  if (!req.body.Category) req.body.Category = req.params.categoryId;
  const { Title, Category } = req.body;
  const newSubCategory = await SubcategoryModel.create({
    Title,
    Slug: slugify(Title),
    Category,
  });
  res.status(201).json({ data: newSubCategory, success: true });
});

// @desc   Update category by id
// @route  PUT /api/v1/subcategories/:id
// @access private
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Title, Category } = req.body;
  const category = await SubcategoryModel.findOneAndUpdate(
    { _id: id },
    { Title, Slug: slugify(Title), Category },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ msg: `No subcategory for this id ${id}` });
  }
  res.status(201).json({ data: category, success: true });
});

// @desc   Delete category by id
// @route  DELETE /api/v1/subcategories/:id
// @access private
exports.remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await SubcategoryModel.findOneAndDelete(id);
  if (!category) {
    res.status(404).json({ msg: `No subcategory for this id ${id}` });
  }
  res.status(201).json({ msg: "Subcategory has been deleted!", success: true });
});

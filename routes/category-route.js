const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../services/category-service");

const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/category-validator");
const subcategoryRoute = require("./subcategory-route");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoryRoute);

router.route("/").get(getAll).post(createCategoryValidator, create);
router
  .route("/:id")
  .get(getCategoryValidator, getOne)
  .put(updateCategoryValidator, update)
  .delete(deleteCategoryValidator, remove);

module.exports = router;

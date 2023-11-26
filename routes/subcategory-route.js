const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../services/subcategory-service");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subcategory-validator");

const router = express.Router();

router.route("/").get(getAll).post(createSubCategoryValidator, create);
router
  .route("/:id")
  .get(getSubCategoryValidator, getOne)
  .put(updateSubCategoryValidator, update)
  .delete(deleteSubCategoryValidator, remove);

module.exports = router;

const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
  setCategoryIdToBody,
  createFilterObgToBody,
} = require("../services/subcategory-service");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subcategory-validator");

// MergeParams: Allow us to access parameters on another routers
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObgToBody, getAll)
  .post(setCategoryIdToBody, createSubCategoryValidator, create);
router
  .route("/:id")
  .get(getSubCategoryValidator, getOne)
  .put(updateSubCategoryValidator, update)
  .delete(deleteSubCategoryValidator, remove);

module.exports = router;

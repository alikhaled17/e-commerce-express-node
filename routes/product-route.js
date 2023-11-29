const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../services/product-service");

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/product-validator");
// const subcategoryRoute = require("./subcategory-route");

const router = express.Router();

// router.use("/:productId/subcategories", subcategoryRoute);

router.route("/").get(getAll).post(createProductValidator, create);
router
  .route("/:id")
  .get(getProductValidator, getOne)
  .put(updateProductValidator, update)
  .delete(deleteProductValidator, remove);

module.exports = router;

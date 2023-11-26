const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../services/brand-service");

const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brand-validator");

const router = express.Router();

router.route("/").get(getAll).post(createBrandValidator, create);
router
  .route("/:id")
  .get(getBrandValidator, getOne)
  .put(updateBrandValidator, update)
  .delete(deleteBrandValidator, remove);

module.exports = router;

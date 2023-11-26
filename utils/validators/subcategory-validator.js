/* eslint-disable import/no-extraneous-dependencies */
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("Title")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category title")
    .isLength({ max: 32 })
    .withMessage("Too long category title"),
  check("Category")
    .notEmpty()
    .withMessage("Subcategory must be belong to parent category!")
    .isMongoId()
    .withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

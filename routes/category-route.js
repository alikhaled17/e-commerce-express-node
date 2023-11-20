const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../services/category-service");

const router = express.Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;

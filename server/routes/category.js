const express = require("express");
const router = express.Router();
const {
  list,
  create,
  read,
  update,
  remove,
} = require("../controllers/category");

const { tokenVerify, adminCheck } = require("../middleware/auth");

router.get("/category", tokenVerify, adminCheck, list);

router.post("/category", tokenVerify, adminCheck, create);

router.get("/category/:id", tokenVerify, adminCheck, read);

router.put("/category/:id", tokenVerify, adminCheck, update);

router.delete("/category/:id", tokenVerify, adminCheck, remove);

module.exports = router;

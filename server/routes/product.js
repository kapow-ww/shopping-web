const express = require("express");
const router = express.Router();

const {
  create,
  list,
  remove,
  read,
  update,
  listBy,
} = require("../controllers/product");

const { tokenVerify, adminCheck } = require("../middleware/auth");

// router.get("/product", tokenVerify, adminCheck, list);

router.post("/product", tokenVerify, adminCheck, create);

router.get("/products/:count", list);

router.post("/productby/", listBy);

router.delete("/product/:id", tokenVerify, adminCheck, remove);

router.get("/product/:id", read);

router.put("/product/:id", tokenVerify, adminCheck, update);

// router.get("/product/:id", tokenVerify, adminCheck, read);

// router.put("/product/:id", tokenVerify, adminCheck, update);

// router.delete("/product/:id", tokenVerify, adminCheck, remove);

module.exports = router;

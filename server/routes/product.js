const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/product");

const { tokenVerify, adminCheck } = require("../middleware/auth");

// router.get("/product", tokenVerify, adminCheck, list);

router.post("/product", create);

router.get("/products", list);

// router.get("/product/:id", tokenVerify, adminCheck, read);

// router.put("/product/:id", tokenVerify, adminCheck, update);

// router.delete("/product/:id", tokenVerify, adminCheck, remove);

module.exports = router;

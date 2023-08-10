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

router.get("/category", list);

router.post("/category", create);

router.get("/category/:id", read);

router.put("/category/:id", update);

router.delete("/category/:id", remove);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
} = require("../controllers/users");

const { tokenVerify, adminCheck } = require("../middleware/auth");

router.get("/users", listUsers);

router.get("/users/:id", readUsers);

router.put("/users/:id", updateUsers);

router.delete("/users/:id", removeUsers);

module.exports = router;

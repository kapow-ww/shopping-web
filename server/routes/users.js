const express = require("express");
const router = express.Router();

const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeStatus,
  changeRole,
} = require("../controllers/users");

const { tokenVerify, adminCheck } = require("../middleware/auth");

router.get("/users", tokenVerify, adminCheck, listUsers);

router.post("/users/change-status", tokenVerify, adminCheck, changeStatus);

router.post("/users/change-role", tokenVerify, adminCheck, changeRole);

router.get("/users/:id", readUsers);

router.put("/users/:id", updateUsers);

router.delete("/users/:id", tokenVerify, adminCheck, removeUsers);

module.exports = router;

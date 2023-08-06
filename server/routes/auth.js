const express = require("express");
const router = express.Router();

const {
  register,
  login,
  listUser,
  editUser,
  deleteUser,
  currentUser,
  currentAdmin,
} = require("../controllers/auth");

const { tokenVerify, adminCheck } = require("../middleware/auth");

router.get("/auth", tokenVerify, listUser);

router.post("/register", register);

router.post("/login", login);

router.post("/current-user", tokenVerify, currentUser);

router.post("/current-admin", tokenVerify, adminCheck, currentUser);

// router.put("/auth", editUser);

// router.delete("/auth", deleteUser);

module.exports = router;

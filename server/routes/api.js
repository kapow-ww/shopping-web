const express = require("express");
const router = express.Router();

const {
  register,
  login,
  listUser,
  editUser,
  deleteUser,
} = require("../controllers/auth");

router.get("/auth", listUser);

router.post("/register", register);

router.post("/login", login);

router.put("/auth", editUser);

router.delete("/auth", deleteUser);

module.exports = router;

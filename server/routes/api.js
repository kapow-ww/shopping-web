const express = require("express");
const router = express.Router();

const {
  register,
  listUser,
  editUser,
  deleteUser,
} = require("../controllers/auth");

router.get("/auth", listUser);

router.post("/auth", register);

router.put("/auth", editUser);

router.delete("/auth", deleteUser);

module.exports = router;

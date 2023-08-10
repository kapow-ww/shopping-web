const express = require("express");
const router = express.Router();

const { register, login, currentUser } = require("../controllers/auth");

const { tokenVerify, adminCheck } = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/current-user", tokenVerify, currentUser);

router.post("/current-admin", tokenVerify, adminCheck, currentUser);

module.exports = router;

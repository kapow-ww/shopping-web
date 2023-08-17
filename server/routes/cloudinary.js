const express = require("express");
const router = express.Router();

const { createImage, removeImage } = require("../controllers/cloudinary");

const { tokenVerify, adminCheck } = require("../middleware/auth");

router.post("/images", tokenVerify, adminCheck, createImage);
router.post("/remove-image", tokenVerify, adminCheck, removeImage);

module.exports = router;

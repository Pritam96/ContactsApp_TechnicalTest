const express = require("express");
const router = express.Router();
const { register, login, getMe, confirmEmail } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get current user
router.get("/me", protect, getMe);

// Confirm email
router.get("/confirmemail", confirmEmail);

module.exports = router;

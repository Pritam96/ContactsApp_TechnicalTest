const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  confirmEmail,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Logout user
router.get("/logout", protect, logout);

// Get current user
router.get("/me", protect, getMe);

// Confirm email
router.get("/confirmemail", confirmEmail);

module.exports = router;

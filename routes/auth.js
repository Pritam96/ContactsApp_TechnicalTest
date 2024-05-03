const express = require("express");
const router = express.Router();

// Register user
router.post("/register", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Redirect to the Login Page" });
});

// Login user
router.post("/login", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Redirect to the Landing Page" });
});

module.exports = router;

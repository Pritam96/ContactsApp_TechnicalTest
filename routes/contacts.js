const express = require("express");
const router = express.Router();

// Get all contacts
router.get("/", (req, res, next) => {
  res.status(200).json({ success: true, message: "Fetching all contacts" });
});

// Get single contact
router.get("/:id", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Fetch the contact with id: ${req.params.id}`,
  });
});

// Create new contact
router.post("/add", (req, res, next) => {
  res.status(200).json({ success: true, message: "Adding a new contact" });
});

module.exports = router;

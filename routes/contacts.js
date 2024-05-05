const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  createContact,
} = require("../controllers/contacts");
const { protect } = require("../middleware/auth");

// Get all contacts
router.get("/", protect, getContacts);

// Get single contact
router.get("/:id", protect, getContact);

// Create new contact
router.post("/add", protect, createContact);

module.exports = router;

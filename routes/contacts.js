const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  createContact,
} = require("../controllers/contacts");

// Get all contacts
router.get("/", getContacts);

// Get single contact
router.get("/:id", getContact);

// Create new contact
router.post("/add", createContact);

module.exports = router;

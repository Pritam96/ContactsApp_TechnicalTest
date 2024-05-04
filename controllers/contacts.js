const ContactModel = require("../models/Contact");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
exports.getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await ContactModel.find();
  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
exports.createContact = asyncHandler(async (req, res, next) => {
  const contact = await ContactModel.create(req.body);

  res.status(201).json({
    success: true,
    data: contact,
  });
});

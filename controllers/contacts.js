const ContactModel = require("../models/Contact");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
exports.getContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
exports.createContact = async (req, res, next) => {
  try {
    const contact = await ContactModel.create(req.body);

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

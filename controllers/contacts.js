const ContactModel = require("../models/Contact");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all contacts / Search contacts
// @route   GET /api/contacts
// @access  Private
exports.getContacts = asyncHandler(async (req, res, next) => {
  const searchKeyword = req.query.search;
  let keyword = {};
  if (searchKeyword) {
    keyword = {
      $or: [
        { name: { $regex: searchKeyword, $options: "i" } },
        { phoneNumber: { $regex: searchKeyword, $options: "i" } },
      ],
    };
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await ContactModel.countDocuments();

  const contacts = await ContactModel.find(keyword)
    .sort("name")
    .skip(startIndex)
    .limit(limit);

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: contacts.length,
    pagination,
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

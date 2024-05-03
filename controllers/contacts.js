// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
exports.getContacts = (req, res, next) => {
  res.status(200).json({ success: true, message: "Fetching all contacts" });
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
exports.getContact = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Fetch the contact with id: ${req.params.id}`,
  });
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
exports.createContact = (req, res, next) => {
  res.status(200).json({ success: true, message: "Adding a new contact" });
};

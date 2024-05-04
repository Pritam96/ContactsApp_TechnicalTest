const UserModel = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, emailId, password } = req.body;

  // Create user
  const user = await UserModel.create({ username, emailId, password });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Redirect to the Landing Page" });
});

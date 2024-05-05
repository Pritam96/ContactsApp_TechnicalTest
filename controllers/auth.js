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
  const token = await user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return next(
      new ErrorResponse("Please provide an email and password.", 400)
    );
  }

  // Check for user
  const user = await UserModel.findOne({ emailId }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials.", 401));
  }

  // Check if password matches
  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorResponse("Invalid Credentials.", 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Cookie can be accessed through client side script only
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, token });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

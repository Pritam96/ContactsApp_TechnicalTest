const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");
const UserModel = require("../models/User");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, emailId, password } = req.body;

  // Create user
  const user = await UserModel.create({ username, emailId, password });

  // Generate token and send to email
  const confirmEmailToken = user.generateEmailConfirmToken();

  // Create confirmation url
  const confirmEmailURL = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/confirmemail?token=${confirmEmailToken}`;

  const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

  user.save({ validateBeforeSave: false });

  try {
    const sendResult = await sendEmail({
      email: user.emailId,
      subject: "Email confirmation token",
      message,
    });
    res.status(200).json({ success: true, data: "Email sent successfully" });
  } catch (error) {
    console.log(error);

    // Remove the user if email sending fails
    await user.remove();

    return next(new ErrorResponse("Email could not be sent", 500));
  }
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

  // Check if email confirmed
  if (!user.isEmailConfirmed) {
    return next(new ErrorResponse("Please confirm your email to login.", 401));
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

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
  // Expire that cookie
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

// @desc    Confirm email
// @route   GET /api/auth/confirmemail
// @access  Public
exports.confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.query;

  if (!token) return next(new ErrorResponse("Invalid Token", 400));

  // Generating hash
  const confirmEmailToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // get user by token
  const user = await UserModel.findOne({
    confirmEmailToken,
    isEmailConfirmed: false,
  });

  if (!user) return next(new ErrorResponse("Invalid Token", 400));
  if (user.confirmEmailTokenExpire < Date.now())
    return next(new ErrorResponse("You token has expired", 401));

  user.isEmailConfirmed = true;
  user.confirmEmailToken = undefined;
  user.confirmEmailTokenExpire = undefined;

  // save
  user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ success: true, data: "Email confirmation successful" });
});

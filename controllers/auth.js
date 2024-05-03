// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Redirect to the Login Page" });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Redirect to the Landing Page" });
};

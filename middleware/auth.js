const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const UserModel = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route.", 401));
  }

  // Verifying the token received from client side
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp > Date.now()) {
      return next(new ErrorResponse("Your authorization has expired.", 401));
    }

    // Set request user
    req.user = await UserModel.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this route.", 401));
  }
});

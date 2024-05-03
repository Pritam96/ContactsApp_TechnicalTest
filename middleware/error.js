const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  // console that error
  console.log(err.stack);

  let error = { ...err };
  error.message = err.message;

  // Id which is not properly formatted
  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    // const message = "Duplicate field value entered";
    const message = `This ${Object.keys(err.keyPattern)[0]} is already exists.`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;

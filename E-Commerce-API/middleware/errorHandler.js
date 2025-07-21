const AppError = require("./../errors/error"); // Make sure this path is correct

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please use a valid ID.`;
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  // Create a mutable copy of the error object
  // It's important to create a proper copy that includes non-enumerable properties like 'name', 'message', 'stack'
  let error = {
    ...err,
    name: err.name,
    message: err.message,
    stack: err.stack,
  };

  // Handle specific operational errors that need transformation
  if (error.name === "CastError") {
    error = handleCastErrorDB(error); // Transform the Mongoose CastError into your AppError
  }

  // Set default status code and status if they haven't been set by an AppError
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // Send the final error response based on environment
  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      error: error, // Send the transformed/original error object
      message: error.message,
      stack: error.stack, // Stack trace is useful for debugging
    });
  } else {
    // In production, only send operational errors' details to the client
    // For programming errors, send a generic message to prevent leaking sensitive info.
    if (error.isOperational) {
      // Assuming your AppError sets isOperational = true
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      // For programming errors or unknown errors, log it internally but send a generic message
      console.error("UNEXPECTED ERROR 💥", err); // Log the full original error internally
      res.status(500).json({
        status: "error",
        message: "Something went very wrong! Please try again later.",
      });
    }
  }
};

module.exports = errorHandler;

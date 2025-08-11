const AppError = require("./../errors/error"); // Make sure this path is correct

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please use a valid ID.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Duplicate field error: ${value ? value[0] : ''}, please try another value`
  return new AppError(message, 400);
}
const handleJWTError = () => {
  return new AppError('Invalid token, please log in', 401)
}
const handleJWTExpiredError = () => {
  return new AppError("Your token has expired! Please log in again.", 401)
}
const errorHandler = (err, req, res, next) => {

  let error = {...err};
  error.name =  err.name;
  error.message = err.message;
  error.stack = err.stack;


  if (error.name === "CastError") {
    error = handleCastErrorDB(error); 
  }
  if(error.code === 11000) {
    error = handleDuplicateFieldsDB(error)
  }
  if (error.name === 'JsonWebTokenError') {
  error = handleJWTError();
}
  if (error.name === 'TokenExpiredError') {
  error = handleJWTExpiredError();
}


  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";


  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      error: error, 
      message: error.message,
      stack: error.stack, 
    });
  } else {

    if (error.isOperational) {
     
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {

      console.error("UNEXPECTED ERROR 💥", err); 
      res.status(500).json({
        status: "error",
        message: "Something went very wrong! Please try again later.",
      });
    }
  }
};

module.exports = errorHandler;

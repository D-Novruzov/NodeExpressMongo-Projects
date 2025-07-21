const catchAsync = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      throw err;
    }
  };
};
module.exports = catchAsync;

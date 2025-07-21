const User = require("./../models/user");
const catchAsync = require("./../utils/catchAsync");
exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    data: user,
  });
  console.log(err);
});
exports.getUser = catchAsync(async (req, res) => {
  const user = User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    user,
  });
});

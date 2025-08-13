const User = require("./../models/user");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../errors/error");
const bcrypt = require("bcryptjs");


exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    data: user,
  });
});


exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  }
  next(new AppError("There is no such user", 404));
});


exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { active: false },
    { new: true }
  );
  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  }
  next(new AppError("There is no such user", 404));
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (user) {
    res.status(200).json({
      status: "success",
    });
  }
  next(new AppError("There is no such user", 404));
});

///////////////// Registering and signing the user //////////////////////////////
exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  if (!user) {
    next(new AppError("Signing up failed, please try again", 500));
  }
  res.status(201).json({
    status: "success",
    user,
  });
});

exports.logIn = catchAsync(async (req, res, next) => {
  const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400)); 
  }

  const user = await User.findOne({ email, active: true }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    token,
    user,
  });
});

exports.logOut = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("Something went wrong please try again later", 500));
  }
  user.active = false;
  res.status(200).json({
    user,
  });
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.email && !req.body.password) {
    return next(new AppError("You should provide email and password", 400));
  }
  const { email, password, newPassword, newPasswordConfirmation } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Your password is not correct", 403));
  }

  if (newPassword !== newPasswordConfirmation) {
    return next(new AppError("Password confirmation failed, try again", 400));
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirmation;


  await user.save();
  res.status(200).json({
    status: "success",
    message: "Password successfully updated",
  });
});

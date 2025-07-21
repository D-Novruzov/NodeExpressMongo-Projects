const User = require("./../models/user");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../errors/error");
const bcrypt = require("bcryptjs");
//Getting All users.
exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    data: user,
  });
});

//Getting the user By id
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  }
  next(new AppError("there is no such user", 404));
});

//Making the user not active, by admin
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
  next(new AppError("there is no such user", 404));
});

//Delete the user from the database
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (user) {
    res.status(200).json({
      status: "success",
    });
  }
  next(new AppError("there is no such user", 404));
});
/////////////////registering and signing the user//////////////////////////////////
exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  if (user) {
    res.status(201).json({
      status: "success",
      user,
    });
  }
  next(new AppError("signing up failed, please try again", 500));
});
exports.logIn = catchAsync(async (req, res, next) => {
  const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d", 
    });
  };
  const { email, password } = req.body;

  // 1. Check if email and password exist in the request body
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400)); // 400 Bad Request
  }

  // 2. Find user by email and select password (as it's often `select: false` in schema)
  // `+password` forces Mongoose to include the password field in the query result
  const user = await User.findOne({ email }).select("+password");

  // 3. Check if user exists AND password is correct
  // You need a method on your User model to compare hashed passwords
  // Example: `await user.correctPassword(password, user.password)`
  // This `correctPassword` method would use `bcrypt.compare()` internally.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401)); // 401 Unauthorized
  }

  // 4. If everything is OK, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    jwt,
    user,
  });
});

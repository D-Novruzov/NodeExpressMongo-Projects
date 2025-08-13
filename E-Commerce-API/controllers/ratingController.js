const catchAsync = require("../utils/catchAsync");
const AppError = require("./../errors/error");
const Rating = require('../models/rating')
const Product = require("../models/product");


exports.createProductRating = catchAsync(async (req, res, next) => {
  const { rating } = req.body;
  const existing = await Rating.findOne({
    user: req.user.id,
    product: req.params.productId,
  });
  if (existing) return next(new AppError('You already rated this product', 400));
  const newRating = await Rating.create({
    user: req.user.id,
    product: req.params.productId,
    rating
  });
  res.status(200).json({
    message: "success",
    newRating
  });
});

exports.getProductRating = catchAsync(async (req, res, next) => {
  const rating = await Rating.find({
    product: req.params.productId
  }).populate('user');
  if (rating.length === 0) return next(new AppError('This product do not have any rating', 400));
  res.status(200).json({
    message: 'success',
    rating
  });
});

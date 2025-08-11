const { response } = require("express");
const catchAsync = require("../utils/catchAsync");
const Product = require("./product");
const AppError = require("../errors/error");
const product = require("./product");
const rating = require("./rating");

exports.getTotalStockForEachCategory = catchAsync(async (req, res, next) => {
  const data = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalStock: {
          $sum: "$stock",
        },
      },
    },
  ]);
  if (!data)
    return next(
      new AppError("Something went wrong please try again later", 404)
    );
  res.status(200).json({
    message: "success",
    data,
  });
});

exports.getMostExpensiveProductByCategory = catchAsync(
  async (req, res, next) => {
    const data = await Product.aggregate([
      {
        $sort: { price: -1 },
      },
      {
        $group: {
          _id: "$category",
          product: { $first: "$name" },
          price: { $first: "$price" },
        },
      },
    ]);
    if (!data)
      return next(
        new AppError("Something went wrong please try again later", 404)
      );
    res.status(200).json({
      message: "success",
      data,
    });
  }
);

exports.getAverageRatingOfTopThreeByCategory = catchAsync(
  async (req, res, next) => {
    const data = await Product.aggregate([
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "product",
          as: "ratings",
        },
      },

      {
        $addFields: {
          avgRating: { $avg: "$ratings.rating" },
        },
      },
      {
        $sort: { price: -1 },
      },
      {
        $group: {
          _id: "$category",
          topProducts: {
            $push: {
              name: "$name",
              price: "$price",
              avgRating: "$avgRating",
            },
          },
        },
      },

      {
        $project: {
          topProducts: { $slice: ["$topProducts", 3] },
        },
      },
    ]);
    if (!data)
      return next(
        new AppError("Something wnet wrong please try again later", 404)
      );
    res.status(200).json({
      message: "success",
      data,
    });
  }
);

exports.getHighestRatingByCategory = catchAsync(async (req, res, next) => {
  const data = await Product.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "product",
        as: "ratings",
      },
    },

      {
        $addFields: {
          avgRating: { $avg: "$ratings.rating" },
        },
      },

    {
      $sort: { avgRating: -1 },
    },

    {
      $group: {
        _id: "$category",
        highestRatedProduct: {$first: "$$ROOT"},
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        product: "$highestRatedProduct"
      }
    }
  ]);
        if (!data)
      return next(
        new AppError("Something wnet wrong please try again later", 404)
      );
    res.status(200).json({
      message: "success",
      data,
    });
  
});

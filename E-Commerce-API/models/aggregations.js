const { response } = require("express");
const catchAsync = require("../utils/catchAsync");
const Product = require("./product");

exports.getMostExpensiveProductByCategory = catchAsync(async () => {
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
  res.status(200).json({
    message: "success",
  });
});

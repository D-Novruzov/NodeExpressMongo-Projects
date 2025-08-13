const cron = require("node-cron");
const Product = require("./models/product");
const Order = require("./models/order");
const aggregations = require("./models/aggregations");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./errors/error");
const order = require("./models/order");

const getAverageRatingOfTopThreeByCategory = catchAsync(async () => {
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
    { $sort: { price: -1 } },
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

  if (!data) {
    return next(
      new AppError("Something wnet wrong please try again later", 404)
    );
  }
  console.log(data);
});

const getNumberOfOrders = catchAsync(async () => {
  const orders = await Order.find();
  const paidOrders = orders.filter((order) => {
    return order.paymentStatus === "paid" && order.status === "delivered";
  });
  console.log(`Number of orders for this month: ${paidOrders.length}`);
});

const getMostPopularCategory = catchAsync(async () => {
  const stats = await Order.aggregate([
    {
      $match: { paymentStatus: "paid" },
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "details",
      },
    },
    {
      $unwind: "$details",
    },
    {
      $group: {
        _id: "$details.category",
        quantitySold: { $sum: "$quantity" },
      },
    },
    {
      $sort: { quantitySold: -1 },
    },
  ]);
});

// ALTERNATIVE VERSION (This should be slower)

// const getMostPopularCategory = catchAsync(async () => {
//   const stats = [];
//   const orders = await Order.find().populate("items.product");
//   orders.forEach((order) => {
//     order.items.forEach((item) => {
//       const found = stats.find((el) => el.category === item.category);
//       if (!found) {
//         return stats.push({
//           category: item.product.category,
//           quantitySold: item.quantity,
//         });
//       }
//       found.quantitySold += 1;
//     });
//   });
//   console.log(stats);
// });

const getMonthlySalesReport = catchAsync(async () => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const monthlySale = await Order.aggregate([
    {
      $match: {
        paymentStatus: "paid",
        createdAt: { $gte: lastMonth },
      },
    },
    {
      $addFields: {
        totalPrice: {
          $round: [
            {
              $sum: {
                $map: {
                  input: "$items",
                  as: "item",
                  in: { $multiply: ["$$item.price", "$$item.quantity"] },
                },
              },
            },
            2,
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  if (!monthlySale)
    return new AppError("Something went wrong please try again later", 404);

  console.log(monthlySale);
});

cron.schedule("0 0 1 * *", getMonthlySalesReport);
cron.schedule("0 0 1 * *", getMostPopularCategory);
cron.schedule("0 0 1 * *", getAverageRatingOfTopThreeByCategory);
cron.schedule("0 0 1 */6 *", getNumberOfOrders);

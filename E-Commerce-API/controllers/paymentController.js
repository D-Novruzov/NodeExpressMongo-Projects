const catchAsync = require('../utils/catchAsync')
const Order = require('../models/order')
const AppError = require('../errors/error')
const { stripe } = require('../stripe');

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("Invalid order ID", 404));
  
  if (!order.items || order.items.length === 0) {
    return next(new AppError("Order has no items for checkout", 400));
  }

  const line_items = order.items.map((item) => {
    if (
      !item.name ||
      !item.price ||
      !item.quantity ||
      item.quantity <= 0
    ) {
      throw new AppError("Invalid item data in order", 400);
    }
    return {
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  console.log("Stripe line_items:", line_items);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://google.com",
    cancel_url: "https://google.com",
    line_items,
    metadata: {
      orderId: order._id.toString(),
    },
  });

  res.status(200).json({
    url: session.url,
  });
});

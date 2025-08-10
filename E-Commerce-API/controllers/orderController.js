const Cart = require("../models/userCart");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../errors/error");


exports.createOrderFromCart = catchAsync(async (req, res, next) => {
  //what we get from req.body
  //we create  orderndocument with the info
  const { shippingAddress, paymentMethod, note } = req.body;

  if (
    !shippingAddress ||
    !shippingAddress.street ||
    !shippingAddress.city ||
    !shippingAddress.postalCode ||
    !shippingAddress.country ||
    !paymentMethod
  ) {
    return next(new AppError("Please provide a valid shipping address", 400));
  }

  const user = await User.findById(req.user.id);
  if (!user)
    return next(new AppError("please log in first to make an order", 403));

  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );
  if (!cart) return next(new AppError("There are no items in your cart"));
  const items = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  const totalPrice = cart.items.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items,
    totalPrice,
    shippingAddress,
  });
  cart.items = [];
  await cart.save();
  res.status(201).json({
    message: "order successfully created",
    order,
  });
});
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ user: req.user.id });
  if (!order) return next(new AppError("you do not have any orders", 404));
  res.status(200).json({
    message: "success",
    order,
  });
});
exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("there is no order with this id", 404));
  res.status(200).json({
    message: "success",
    order,
  });
});
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const status = req.body.status
  if(!status) return next(new AppError('please enter valid status', 400))
  const availableStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
  const order = await Order.findById(req.params.id)
  if (!order) return next(new AppError('there is no order', 404)); // ❌ no return
if (availableStatuses.includes(status)) {
  order.status = status;
  await order.save();
} else {
  return next(new AppError('status should be valid', 404));
}
return res.status(200).json({ message: 'success' });
}) 
exports.updatePaymentStatus = catchAsync(async (req, res, next) => {
  const paymentsArray = ["unpaid", "paid", "refunded"]
  const {paymentStatus} = req.body;
  const order = await Order.findById(req.params.id)
  if (!order) return next(new AppError('there is no order', 404));
 if (!paymentsArray.includes(paymentStatus)) 
  return next(new AppError('status should be valid', 404));

  order.paymentStatus = paymentStatus;
  await order.save();
  res.status(200).json({ message: 'success' });


})
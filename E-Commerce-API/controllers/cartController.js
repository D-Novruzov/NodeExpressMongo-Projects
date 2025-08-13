const Cart = require('../models/userCart');
const User = require('../models/user')

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../errors/error");

exports.getUserCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('Authorize first', 403)); 

  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'items.product',
    select: 'name price quantity image'
  });

  if (!cart) return next(new AppError('You do not have things added to cart', 404)); 

  const totalPrice = Number(cart.items.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0)).toFixed(2);
  const totalQuantity = cart.items.reduce((acc, curr) => acc + curr.quantity, 0);

  res.status(200).json({
    status: 'success',
    cart: cart.items,
    totalPrice,
    totalQuantity
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('Authorize first', 403));

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = await Cart.create({
      user: user._id,
      items: []
    });
  }

  const { productId, quantity } = req.body;
  if (!productId || !quantity) return next(new AppError('Please enter the product id and quantity', 400)); 
  
  const index = cart.items.findIndex(item => item.product.toString() === productId);
  if (index > -1) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({
      product: productId,
      quantity
    });
  }
  await cart.save();

  res.status(201).json({
    message: "Item successfully added",
  });
});

exports.updateProductQuantity = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('Authorize first', 403));

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new AppError('You do not have any items in the cart', 404));

  const index = cart.items.findIndex(item => item.product.toString() === req.params.productId);
  const { quantity } = req.body;

  if (quantity === 0 || quantity > 100) return next(new AppError('Entered quantity should be above zero and below 100', 400));

  if (index > -1) {
    cart.items[index].quantity += quantity;

    if (cart.items[index].quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    }
  } else {
    return next(new AppError('There is no such product in your cart', 404));
  }
  await cart.save();
  res.status(200).json({
    message: 'success',
  });
});

exports.removeProduct = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError('Authorize first', 403));

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new AppError('You do not have any items in the cart', 404));

  const index = cart.items.findIndex(item => item.product.toString() === req.params.productId);
  if (index < 0) return next(new AppError('There is no such product in your cart', 404)); 

  cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
  await cart.save();

  res.status(204).json({}); 
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return next(new AppError('You do not have any items in the cart', 404));
  cart.items = [];
  await cart.save();
  res.status(200).json({
    message: "success"
  });
});

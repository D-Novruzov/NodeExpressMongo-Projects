const Product = require("./../models/product");
const catchAsync = require("./../utils/catchAsync");

const AppError = require("./../errors/error");
const APIFeatures = require("./APIFeatures");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  if (!products || products.length === 0)
    return next(new AppError("Something went wrong please try again later", 404)); 


  const numberOfProducts = products.length;
  res.status(200).json({
    status: "success",
    products,
    numberOfProducts,
  });
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
  });

  if (!product)
    return next(new AppError("Something went wrong please try again later!", 500)); 


  res.status(201).json({
    status: "success",
    product,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return next(new AppError("No product with such id, please enter valid id", 404)); 
 

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product)
    return next(
      new AppError(
        "There is no product with such id, enter the valid id to update the product",
        404
      )
    );

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });

  if (!product)
    return next(
      new AppError(
        "There is no product with such id, enter the valid id to delete the product",
        404
      )
    );

  res.status(204).json({}); 
});

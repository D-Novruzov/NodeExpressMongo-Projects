const Product = require("./../models/product");
const catchAsync = require("./../utils/catchAsync");

const AppError = require("./../errors/error");



exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    if(!products) return next(new AppError('something went wrog please try again later'))
    const numberOfProducts = products.length
    res.status(200).json({
        message: 'success', 
        products,
        numberOfProducts

    })
});


exports.addProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        

    })
    if(!product) return next( new AppError("something went wrong please try again later!"))
    res.status(201).json({
        message: "product added",
        product
    })
})


exports.getProduct = catchAsync(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if(!product) return next(new AppError('no product with such id, please enter valid id'))
    res.status(200).json({
        message: 'success',
        product
})
})
exports.updateProduct = catchAsync(async (req, res, next) => {

    const product = await Product.findOneAndUpdate({_id: req.params.id},  req.body,  {new: true, runValidators: true})
    if(!product) return next(new AppError('there is no product with such id, enter the valid id to update the product'))
    res.status(200).json({
        message: 'successfully updated',
        product
})
 
})
exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findOneAndDelete({_id: req.params.id});
    if(!product) return next(new AppError('there is no product with such id, enter the valid id to delete the product'))
    res.status(204).json({
       
    })
})

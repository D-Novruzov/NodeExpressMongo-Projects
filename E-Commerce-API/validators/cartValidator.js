const {body, param} = require('express-validator')

exports.validateAddingToCart = [
    body('productId').notEmpty().isMongoId().withMessage('product id shuold be valid'),
    body("quantity").notEmpty().isInt({min: 1, max: 100}).withMessage('Quantity should be within valid range, from 0 to 100')
]
exports.validateUpdatingProductQuantity = [
    param("productId").notEmpty().isMongoId().withMessage('Product id should be valid'),
    body('quantity').notEmpty().isInt().withMessage("Enter the quantity")
]
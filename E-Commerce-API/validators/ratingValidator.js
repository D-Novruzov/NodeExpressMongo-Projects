const { body, param} = require('express-validator');


exports.validateGetProductRating = [
    param('productId').isMongoId().withMessage('Product rating should be valid')
]
exports.validateCreateProductRating = [
        param('productId').isMongoId().withMessage('Product rating should be valid'),
        body("rating").notEmpty().isFloat({min: 1, max: 5})
]
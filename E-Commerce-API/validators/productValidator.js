const {body, param} = require('express-validator')


exports.validateAddingProdcuts = [
    body("name").notEmpty().isString().withMessage('Product name is required'),
    body("description").notEmpty().isString().isLength({min: 20}).withMessage("Product should have a description"),
    body("price").notEmpty().isInt({min: 1}).withMessage('Minimum price should be 1$'),
    body("category").notEmpty().isString().isIn(["Electronics",
  "Smart Home",
  "Furniture",
  "Outdoors",
  "Fitness",
  "Fashion",
  "Accessories"]).withMessage('Product category should be valid'),
  body("stock").notEmpty().isInt({min: 10}),
  
]

exports.validateGettingProductById = [
    param('id').isMongoId().withMessage('Enter the valid ID')
]

exports.validateUpdatingProductById = [
    param('id').isMongoId().withMessage('Enter the valid ID'),
    body("name").optional(),
    body("description").optional(),
    body("price").optional().isInt({min: 1}).withMessage('Minimum price should be 1$'),
    body("category").optional().isString().isIn(["Electronics",
  "Smart Home",
  "Furniture",
  "Outdoors",
  "Fitness",
  "Fashion",
  "Accessories"]).withMessage('Product category should be valid'),
  body("stock").optional().isInt({min: 10}),
  
]


exports.validateDeletingProductById =[ 
        param('id').isMongoId().withMessage('Enter the valid ID')

]
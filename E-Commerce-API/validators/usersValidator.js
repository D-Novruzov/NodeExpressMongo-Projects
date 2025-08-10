const {body, param}  = require('express-validator');

exports.validateGetUser = [
    param('id').isMongoId().withMessage('User ID should be valid')
]

exports.validateUpdatingUserById = [
    param('id').isMongoId().withMessage('User ID should be valid'),
    body('active').notEmpty().isBoolean().withMessage("User should either active or not")

]

exports.validateDeleteUserById = [
        param('id').isMongoId().withMessage('User ID should be valid')
]
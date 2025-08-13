const {body, param} = require('express-validator')

exports.validateCreateOrder= [
    body("shippingAddress").notEmpty().withMessage('Shipping adress is required'),
    body("shippingAddress.street").notEmpty().withMessage('Street is required'),
    body("shippingAddress.city").notEmpty().withMessage('City is required'),
    body("shippingAddress.postalCode").notEmpty().withMessage('Postal code is required'),
    body("shippingAddress.country").notEmpty().withMessage('Country is required'),
    body("paymentMethod").notEmpty().withMessage('Payment Method is required'),
    body("note").optional().isString().withMessage('Note must be a string')
]

exports.validateOrderStatusForAdmin = [
    body("status").isString().isIn(["pending", "processing", "shipped", "delivered", "cancelled"]).withMessage('Status should have one of following values: pending, processing, shipped, delivered')
]
exports.validatePaymentStatusForAdmin = [
    body("paymentStatus").isString().isIn(["unpaid", "paid", "refunded"]).withMessage('Status should have one of following values: unpaid, paid, refunded')
]



exports.validateOrderIdParams = [
    param("id").isMongoId().withMessage('ID should be valid')
    
]
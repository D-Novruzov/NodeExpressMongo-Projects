const express = require("express");
const router = express.Router();
const cartController = require("./../controllers/cartController");
const protect = require('./../middleware/protect')
const restrictTo = require("../middleware/restrictTo.js");


router.use(protect)

router.route('/clear').delete(cartController.clearCart)

router.route('/').get(cartController.getUserCart).post(cartController.addToCart)

router.route('/:productId').put(cartController.updateProductQuantity).delete(cartController.removeProduct)


module.exports = router
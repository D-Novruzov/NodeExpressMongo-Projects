//one route to get the order by id, one to get all the  orders, and to make order from cart
const express = require("express");
const router = express.Router();
const restrictTo = require("../middleware/restrictTo");
const orderController = require("../controllers/orderController");
const protect  = require('../middleware/protect')
const orderValidator = require('../validators/orderValidator')
const validate = require('../middleware/validate')
router.use(protect);

router.route("/")
  .post(...orderValidator.validateCreateOrder, validate, orderController.createOrderFromCart)
  .get(orderController.getMyOrders);

router.route("/:id").get(...orderValidator.validateOrderIdParams,validate, orderController.getOrderById);

router.use(restrictTo("admin"));

router.route("/:id/status").patch(...orderValidator.validateOrderStatusForAdmin, validate, orderController.updateOrderStatus);

router.route("/:id/payment").patch(...orderValidator.validatePaymentStatusForAdmin, validate,  orderController.updatePaymentStatus);

module.exports = router;

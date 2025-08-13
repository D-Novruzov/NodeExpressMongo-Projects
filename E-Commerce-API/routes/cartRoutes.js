const express = require("express");
const router = express.Router();
const cartController = require("./../controllers/cartController");
const protect = require("./../middleware/protect");
const restrictTo = require("../middleware/restrictTo.js");
const validate = require("../middleware/validate.js");
const cartValidator = require("../validators/cartValidator.js");

router.use(protect);

router.route("/clear").delete(cartController.clearCart);

router
  .route("/")
  .get(cartController.getUserCart)
  .post(
    ...cartValidator.validateAddingToCart,
    validate,
    cartController.addToCart
  );

router
  .route("/:productId")
  .put(
    ...cartValidator.validateUpdatingProductQuantity,
    validate,
    cartController.updateProductQuantity
  )
  .delete(cartController.removeProduct);

module.exports = router;

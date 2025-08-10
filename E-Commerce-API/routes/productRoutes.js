const express = require("express");
const router = express.Router();
const productsController = require("./../controllers/productsController");
const protect = require("./../middleware/protect");
const restrictTo = require("../middleware/restrictTo.js");
const validate = require('../middleware/validate.js')
const productValidator = require('../validators/productValidator.js')

router
  .route("/")
  .get(protect, productsController.getAllProducts)
  .post(protect, restrictTo("admin"), ...productValidator.validateAddingProdcuts,validate, productsController.addProduct);

router
  .route("/:id")
  .get(...productValidator.validateGettingProductById,validate, productsController.getProduct)
  .patch(protect, restrictTo("admin"), ...productValidator.validateUpdatingProductById, validate, productsController.updateProduct)
  .delete(protect, restrictTo("admin"), ...productValidator.validateDeletingProductById, validate, productsController.deleteProduct);

module.exports = router;

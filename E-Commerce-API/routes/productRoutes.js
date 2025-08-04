const express = require("express");
const router = express.Router();
const productsController = require("./../controllers/productsController");
const protect = require('./../middleware/protect')
const restrictTo = require("../middleware/restrictTo.js");



router.route('/').get(protect, productsController.getAllProducts).post(protect, restrictTo("admin"), productsController.addProduct);
router.route('/:id').get(productsController.getProduct).patch(protect, restrictTo("admin"), productsController.updateProduct).delete(protect, restrictTo("admin"), productsController.deleteProduct);

module.exports = router






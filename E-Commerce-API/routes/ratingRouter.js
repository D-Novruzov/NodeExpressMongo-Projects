const express = require("express");
const router = express.Router();
const restrictTo = require("../middleware/restrictTo");
const protect = require('../middleware/protect')
const ratingRouter  = require('../controllers/ratingController')
const validate = require('../middleware/validate.js')

const ratingValidator = require('../validators/ratingValidator.js')

router.use(protect)


router.route("/:productId")
  .get(...ratingValidator.validateGetProductRating, validate, ratingRouter.getProductRating)
  .post(...ratingValidator.validateCreateProductRating, validate, ratingRouter.createProductRating);


module.exports = router
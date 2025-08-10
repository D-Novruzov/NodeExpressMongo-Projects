const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");
const protect = require('../middleware/protect.js')
const restrictTo = require("../middleware/restrictTo.js")
const validate = require('../middleware/validate.js')
const usersValidator = require('../validators/usersValidator.js')

//routes for admin
router.use(protect)
router.use(restrictTo("admin"))

router.route("/").get(usersController.getAllUsers);
router
  .route("/:id")
  .get(...usersValidator.validateGetUser, validate, usersController.getUser)
  .patch(...usersValidator.validateUpdatingUserById, validate, usersController.updateUser)
  .delete(...usersValidator.validateDeleteUserById, validate, usersController.deleteUser);
module.exports = router;

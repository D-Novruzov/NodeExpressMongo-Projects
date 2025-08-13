
const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersController");
const protect = require('./../middleware/protect')
const validate = require('../middleware/validate')
const authenticationValidator = require("../validators/authenticationValidator")


router.route("/signUp").post(...authenticationValidator.validateSignUp, validate, usersController.signUp);


router.route("/logIn").post(...authenticationValidator.validateLogIn, validate, usersController.logIn);

router.route("/logOut").post(protect, usersController.logOut)


router.route("/updatePassword").post(protect, ...authenticationValidator.validateUpdatePassword, validate, usersController.updatePassword)


module.exports = router;

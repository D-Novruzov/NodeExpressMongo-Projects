const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersController");
const protect = require('./../middleware/protect')

//routes for user
router.route("/signUp").post(usersController.signUp);
router.route("/logIn").post(usersController.logIn);
router.route("/logOut").post(protect, usersController.logOut)
router.route("/updatePassword").post(protect, usersController.updatePassword)


module.exports = router
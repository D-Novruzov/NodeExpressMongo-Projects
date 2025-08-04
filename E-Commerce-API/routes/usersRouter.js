const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersController");
const protect = require('./../middleware/protect')
const restrictTo = require("../middleware/restrictTo.js")

//routes for admin
router.use(protect)
router.use(restrictTo("admin"))

router.route("/").get(usersController.getAllUsers);
router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
module.exports = router;

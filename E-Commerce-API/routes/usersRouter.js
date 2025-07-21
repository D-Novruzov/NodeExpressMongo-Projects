const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/usersController");

router.route("/signup").post(usersController.signUp);
router.route("/logIn").post(usersController.logIn);

router.route("/").get(usersController.getAllUsers);

router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
module.exports = router;

const express = require("express");
const router = express.Router();
const tasksController = require("./../controllers/tasks");
router
  .route("/")
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);
router
  .route("/:id")
  .get(tasksController.getTask)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);
module.exports = router;

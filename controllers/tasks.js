const Task = require("./../models/task");
const asyncWrapper = require("./../middleware/async");
const { createCustomError } = require("./../errors/custom-error");
exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    amount: tasks.length,
    tasks,
  });
});
exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    task: task,
  });
});
exports.getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(createCustomError("No task with this id", 404));
  }
  // return res.status(404).json({
  //   message: "No task with that id",
  // });
  res.status(200).json({
    status: "success",
    task,
  });
});

exports.updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return next(createCustomError("No task with this id", 404));
  res.status(200).json({
    status: "success",
    task,
  });
});

exports.deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(createCustomError("No task with this id", 404));
  res.status(200).json({
    status: "task deleted successfully",
    task,
  });
});

const Task = require("./../models/task");

exports.getAllTasks = (req, res) => {
  res.send("get all items");
};
exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    task: task,
  });
};
exports.getTask = (req, res) => {
  res.json({ id: req.params.id });
};

exports.updateTask = (req, res) => {
  res.send("update task");
};

exports.deleteTask = (req, res) => {
  res.send("delete task");
};

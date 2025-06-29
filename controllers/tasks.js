const Task = require("./../models/task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      task: task,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was an error",
    });
  }
};
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(404).json({
        message: "No task with that id",
      });
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was an error",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task)
      return res.status(404).json({
        message: "No task with that id",
      });
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was an error",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).json({
        message: "No task with that id",
      });
    res.status(200).json({
      status: "task deleted successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "There was an error",
    });
  }
};

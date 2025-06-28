exports.getAllTasks = (req, res) => {
  res.send("get all items");
};
exports.createTask = (req, res) => {
  res.json(req.body);
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

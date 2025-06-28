const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://novruzovdavcho:Davi-dani1@nodeexpressprojects.9wy71k5.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProjects";
mongoose
  .connect(connectionString)
  .then(() => console.log("connected to the db"))
  .catch((err) => console.log(err));

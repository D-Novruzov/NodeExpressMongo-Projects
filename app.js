require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlingMiddleware = require("./middleware/errorHandler");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlingMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("server is listening"));
  } catch (err) {
    console.log(err);
  }
};
start();

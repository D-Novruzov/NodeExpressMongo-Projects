require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
//async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
app.use(express.json());
const productsRouter = require("./routes/products");
//routes
app.get("/", (req, res) => {
  res.send('<h1> store api </h1><a href="/api/v1/products">products route</a>');
});
app.use("/api/v1/products", productsRouter);
//product route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log("server is listening"));
  } catch (err) {
    console.log(err);
  }
};
start();

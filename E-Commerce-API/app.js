const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");

const userRouter = require("./routes/usersRoutes");
const authRouter = require('./routes/authenticationRoutes')
const productsRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoutes')
const ratingRouter = require('./routes/ratingRouter')
const aggregations = require('./models/aggregations')
dotenv.config();

const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const port = process.env.PORT || 5000;


app.use(helmet)
app.use(cors({
  origin: 'https://myfrontend.com',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));
app.use(express.json());

app.use((req, res, next) => {
  req.body = mongoSanitize(req.body)
  req.params = mongoSanitize(req.params)
  req.query = mongoSanitize(req.query)
})
app.use(xss())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api', limiter);






//Aggregations
app.use("/api/v1/most-expensive-by-category", aggregations.getMostExpensiveProductByCategory)

app.use("/api/v1/avgRating-top-three", aggregations.getAverageRatingOfTopThreeByCategory)

app.use("/api/v1/totalStock-by-category", aggregations.getTotalStockForEachCategory)

app.use("/api/v1/highestRating-by-category", aggregations.getHighestRatingByCategory)


app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/rating", ratingRouter)

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.info("Database connected successfully");
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};


start();

// --- Imports ---
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('mongo-sanitize');
const rateLimit = require('express-rate-limit');
require('./cronJobs')
// --- Environment Configuration ---
dotenv.config();

// --- Route and Middleware Imports ---
const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routes/usersRoutes');
const authRouter = require('./routes/authenticationRoutes');
const productsRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const ratingRouter = require('./routes/ratingRouter');
const webhook = require('./routes/webhooks');
const aggregations = require('./models/aggregations');

// --- App Initialization ---
const app = express();
const port = process.env.PORT || 5000;

// --- Security and Middleware Configuration ---
// Note: Webhook endpoint needs to be declared before express.json()
// to avoid parsing the raw body required by some services like Stripe.
app.use('/webhook', webhook);

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: 'https://myfrontend.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);


app.use(express.json());


// Prevents NoSQL injection attacks by removing illegal characters from user input.
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize(req.body);
  if (req.params) req.params = mongoSanitize(req.params);
  if (req.query) req.query = mongoSanitize(req.query);
  next();
});


// Limits repeated requests to public APIs to prevent brute-force attacks.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', apiLimiter);

// --- API Routes ---
// Aggregation Routes
app.get('/api/v1/most-expensive-by-category', aggregations.getMostExpensiveProductByCategory);
app.get('/api/v1/avgRating-top-three', aggregations.getAverageRatingOfTopThreeByCategory);
app.get('/api/v1/totalStock-by-category', aggregations.getTotalStockForEachCategory);
app.get('/api/v1/highestRating-by-category', aggregations.getHighestRatingByCategory);

// Resource-Specific Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/rating', ratingRouter);

// --- Error Handling ---
// This middleware catches and handles all errors from the routes above.
app.use(errorHandler);

// --- Server Startup ---
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully!');

    app.listen(port, () => {
      console.log(`Server is live and running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database or start the server:', error);
    process.exit(1);
  }
};

startServer();
E-Commerce-API A robust and scalable back-end solution for a modern
e-commerce application. This API handles everything from user
authentication and product management to order processing and data
aggregation. It is built with a focus on security, performance, and
maintainability. 🚀 Key Features This API provides a full suite of
functionalities necessary for an e-commerce platform, including: \* User
& Authentication System: Secure user registration, login, and profile
management with token-based authentication. \* Product Management: A
comprehensive catalog system with CRUD operations for products. \*
Shopping Cart & Orders: Functionality to add/remove items from a cart
and manage the complete order lifecycle. \* Product Ratings: Users can
submit and view ratings for products. \* Secure Payment Integration:
Seamless integration with Stripe for processing payments via a webhook.
\* Advanced Data Aggregations: Dedicated endpoints for querying key
insights, such as: \* Most expensive product by category. \* Average
rating of the top three products by category. \* Total stock count for
each product category. \* Highest rated product by category. \* Robust
Security: Implemented security measures to protect against common web
vulnerabilities. \* Dynamic Querying: All read endpoints support
advanced querying features like filtering, sorting, and pagination. 🛠️
Technologies Used The E-Commerce-API is built on a modern Node.js stack.
\* Node.js: The server-side runtime environment. \* Express: The web
framework for building the API. \* MongoDB: A NoSQL database for
flexible data storage. \* Mongoose: An object data modeling (ODM)
library for MongoDB. \* Stripe: The payment processing platform. \*
Helmet: Secures the app by setting various HTTP headers. \* CORS:
Middleware for enabling Cross-Origin Resource Sharing. \*
express-rate-limit: A rate-limiting middleware to prevent abuse. \*
mongo-sanitize: A utility to prevent NoSQL injection attacks. \* dotenv:
Manages environment variables. ⚙️ Installation and Setup Follow these
steps to get a local copy of the project up and running. Prerequisites
\* Node.js: Ensure you have Node.js installed. \* MongoDB: You will need
a running instance of a MongoDB database. 1. Clone the Repository git
clone https://github.com/your-username/E-Commerce-API.git cd
E-Commerce-API

2\. Configure Environment Variables Create a .env file in the root
directory and add the following variables. Replace the placeholder
values with your own. PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommercedb
STRIPE_SECRET_KEY=sk_test\_\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
WEBHOOK_SECRET=whsec\_\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

3\. Install Dependencies Install all the required packages using npm.
npm install

4\. Seed the Database (Optional) To populate your database with initial
product data, run the seeder script. npm run seed

5\. Start the Server Once everything is configured, start the server.
npm start

The API will be live and running on http://localhost:5000. 📌 API
Endpoints The API is versioned with /api/v1 and provides the following
main endpoints. Authentication \* POST /api/v1/auth/signUp - Register a
new user. \* POST /api/v1/auth/logIn - Log in and receive an
authentication token. \* POST /api/v1/auth/logOut - Log out a user. \*
POST /api/v1/auth/updatePassword - Update a user\'s password. \* POST
/api/v1/auth/forgot-password - Request a password reset. \* PATCH
/api/v1/auth/reset-password/:token - Reset the password with a valid
token. Users (Admin Only) \* GET /api/v1/users - Retrieve a list of all
users. \* GET /api/v1/users/:id - Retrieve a single user by ID. \* PATCH
/api/v1/users/:id - Update a user\'s details. \* DELETE
/api/v1/users/:id - Delete a user. Products \* GET /api/v1/products -
Retrieve a list of all products. \* GET /api/v1/products/:id - Retrieve
a single product by its ID. \* POST /api/v1/products - Create a new
product (Admin Only). \* PATCH /api/v1/products/:id - Update an existing
product (Admin Only). \* DELETE /api/v1/products/:id - Delete a product
(Admin Only). Cart \* GET /api/v1/cart - View the user\'s shopping cart.
\* POST /api/v1/cart - Add a product to the cart. \* PUT
/api/v1/cart/:productId - Update the quantity of a product in the cart.
\* DELETE /api/v1/cart/:productId - Remove a product from the cart. \*
DELETE /api/v1/cart/clear - Clear the entire cart. Orders \* POST
/api/v1/orders - Create a new order from the cart. \* GET
/api/v1/orders - View a list of your orders. \* GET /api/v1/orders/:id -
View a single order by its ID. \* POST /api/v1/orders/:id/pay - Create a
Stripe checkout session for an order. \* PATCH
/api/v1/orders/:id/status - Update an order\'s status (Admin Only). \*
PATCH /api/v1/orders/:id/payment - Update an order\'s payment status
(Admin Only). Ratings \* GET /api/v1/rating/:productId - Get all ratings
for a specific product. \* POST /api/v1/rating/:productId - Create a new
rating for a product. Aggregations \* GET
/api/v1/most-expensive-by-category - Get the most expensive product for
each category. \* GET /api/v1/avgRating-top-three - Get the average
rating for the three most expensive products in each category. \* GET
/api/v1/totalStock-by-category - Get the total stock count for each
category. \* GET /api/v1/highestRating-by-category - Get the product
with the highest average rating in each category. 🔒 Robust Security and
Error Handling This API is built with security and consistent error
handling in mind. The application uses several key middlewares to
protect against common attacks and provides clear, helpful error
messages. \* Global Error Handling: A centralized error handler catches
and formats all application errors. It distinguishes between operational
errors (expected issues like a user submitting an invalid ID) and
unexpected errors (bugs in the code) to prevent sensitive information
from being leaked in production. \* Error Types Handled: The API
explicitly handles the following error scenarios: \* Invalid IDs
(CastError): Returns a clear message when a user provides an incorrectly
formatted ID in the URL. \* Duplicate Fields: Catches and reports
duplicate key errors, such as when a user attempts to sign up with an
email that is already in use. \* Invalid/Expired JWT: Securely handles
authentication failures by returning a 401 Unauthorized error for
invalid or expired JSON Web Tokens. \* Environment-Specific Responses:
The API provides verbose error information (stack traces, full error
objects) during development to aid debugging, while providing simple,
generic error messages in production to maintain security. ⏱️ Scheduled
Tasks (Cron Jobs) The API uses scheduled tasks to perform regular
maintenance and analytics. These jobs are configured to run
automatically at specific intervals. \* Monthly Sales Report: Runs on
the first day of every month to calculate the total sales from the
previous month. \* Most Popular Category: Runs on the first day of every
month to determine the most popular product category based on quantity
sold. \* Average Rating of Top Products: Runs on the first day of every
month to calculate and log the average rating of the top three most
expensive products in each category. \* Monthly Order Count: Runs every
six months to calculate and log the number of delivered and paid orders.
🔍 Advanced Querying and Filtering All API endpoints that return a list
of resources (e.g., GET /api/v1/products) support powerful query
parameters for filtering, sorting, and pagination. Here\'s how you can
use them: \* Filtering: Use comparison operators (gt, gte, lt, lte, ne)
and the in operator. \* GET
/api/v1/products?price\[gt\]=50&category=Electronics - Gets all
electronics products with a price greater than \$50. \* GET
/api/v1/products?category\[in\]=Electronics,Fashion - Gets all products
in the Electronics or Fashion categories. \* Sorting: Use the sort
parameter to sort by a single or multiple fields. \* GET
/api/v1/products?sort=price - Sorts products by price in ascending
order. \* GET /api/v1/products?sort=-price,name - Sorts products by
price in descending order, then by name in ascending order. \* Limiting
Fields: Use the fields parameter to select specific fields to be
returned. \* GET /api/v1/products?fields=name,price,category - Returns
only the name, price, and category for each product. \* Pagination: Use
page and limit to paginate through results. \* GET
/api/v1/products?page=2&limit=10 - Returns the second page of results,
with 10 products per page.

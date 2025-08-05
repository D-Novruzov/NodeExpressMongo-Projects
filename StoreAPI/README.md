# Store API

A robust RESTful API for a product catalog, built with a modern Node.js stack. This project serves as a comprehensive example for building scalable and maintainable APIs, featuring custom middleware, a flexible data model, and advanced query functionality.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Populating the Database](#populating-the-database)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Product Schema](#product-schema)
- [Project Structure](#project-structure)

## Technologies Used

- **Node.js**: A JavaScript runtime for building the server-side application
- **Express**: The core web framework for handling routing and middleware
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB
- **dotenv**: A zero-dependency module to load environment variables from a .env file
- **express-async-errors**: A utility to automatically handle asynchronous errors in Express routes
- **nodemon**: A utility that monitors for changes in your source code and automatically restarts your server

## Installation & Setup

1. Clone the repository:
```bash
git clone 
```

2. Navigate to the project directory:
```bash
cd 
```

3. Install project dependencies:
```bash
npm install
```

4. Create your .env file:
Create a file named `.env` in the root of your project and add your MongoDB connection string and the desired port.
```env
MONGO_URL=your_mongodb_connection_string
PORT=3000
```

## Populating the Database

To populate your MongoDB with the sample product data from `products.json`, use the included script. This script will connect to your database, delete any existing products, and then insert the new data.

```bash
node populate.js
```

## Running the Application

To start the development server with automatic reloading, run the following command. The application will be accessible at http://localhost:3000.

```bash
npm start
```

## API Endpoints

The API provides two endpoints for retrieving product data. The main route offers extensive filtering, sorting, and pagination capabilities.

### GET /

A simple test route that returns a basic HTML page with a link to the main products endpoint.

### GET /api/v1/products

The primary endpoint for fetching product data. It supports a variety of query parameters to customize the response.

| Parameter | Description | Example |
|-----------|-------------|---------|
| `featured` | Filters products that are featured. Accepts true or false. | `?featured=true` |
| `company` | Filters products by the company name. | `?company=liddy` |
| `name` | Searches for products by name using a case-insensitive regular expression. | `?name=wooden` |
| `sort` | Sorts results by one or more fields. Use a comma-separated list. Prepend `-` for descending order. | `?sort=name,-price` |
| `fields` | Selects specific fields to return in the response. Use a comma-separated list. | `?fields=name,price` |
| `numericFilters` | Filters by numeric fields (price, rating) using operators (`>`, `>=`, `<`, `<=`, `=`). | `?numericFilters=price>40,rating>=4` |
| `page` | Specifies the page number for pagination. Defaults to 1. | `?page=2` |
| `limit` | Sets the number of results per page. Defaults to 10. | `?limit=5` |

### GET /api/v1/products/static

A static endpoint that returns all products that are marked as featured. This route does not support any query parameters.

## Product Schema

The Product model is defined with the following Mongoose schema:

- **name**: String, required
- **price**: Number, required
- **featured**: Boolean, defaults to true
- **rating**: Number, defaults to 4.5
- **createdAt**: Date, defaults to Date.now()
- **company**: String, must be one of ikea, liddy, caressa, marcos

## Project Structure

```
.
├── controllers/
│   └── products.js        # Controller logic for product routes
├── db/
│   └── connect.js         # MongoDB connection setup
├── middleware/
│   ├── error-handler.js   # Custom error handling middleware
│   └── not-found.js       # Middleware for handling 404 routes
├── models/
│   └── product.js         # Mongoose schema for the Product model
├── routes/
│   └── products.js        # Express router for product endpoints
├── .env                   # Environment variables
├── app.js                 # Main application entry point
├── package.json           # Project dependencies and scripts
├── populate.js            # Script to seed the database
└── products.json          # Sample product data
```

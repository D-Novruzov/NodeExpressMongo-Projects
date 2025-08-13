const mongoose = require("mongoose");
const Product = require('./models/products');
const products = require('./data/products');
require("dotenv").config();

// Define a function to handle the database seeding
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB.');

        // Clear existing data to prevent duplicates
        await Product.deleteMany({});
        console.log('Existing products cleared.');

        // Insert new product data
        await Product.insertMany(products);
        console.log('Products inserted successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during database seeding:', error);
        process.exit(1);
    }
};

// Execute the seeder function
seedDatabase();
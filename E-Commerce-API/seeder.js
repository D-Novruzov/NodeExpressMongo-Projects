
const mongoose = require("mongoose");
const products = require('./data/products')
const Product = require('./models/products')
require("dotenv").config()


async function seederFunc() 
{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    await Product.insertMany(products)
    console.log('Products inserte');
    process.exit(1)
}catch(err) {
    console.log(err)
}}
seederFunc()
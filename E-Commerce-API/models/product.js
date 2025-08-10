const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: String,
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 1,

    },
    category: {
        type: String,
        required: true,
        enum: [  "Electronics",
  "Smart Home",
  "Furniture",
  "Outdoors",
  "Fitness",
  "Fashion",
  "Accessories"]
    },
    stock: {
        type: Number,
        min: 10,
        required: true
    },

})
module.exports = mongoose.model('Product', productSchema)
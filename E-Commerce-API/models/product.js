const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters long'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      minlength: [20, 'Product description must be at least 20 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [1, 'Price must be at least 1'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
      enum: {
        values: ["Electronics", "Smart Home", "Furniture", "Outdoors", "Fitness", "Fashion", "Accessories"],
        message: 'Invalid product category',
      },
    },
    stock: {
      type: Number,
      min: [10, 'Stock must be at least 10'],
      required: [true, 'A product must have a stock count'],
    },
  },
  {
    timestamps: true, 
  }
);




module.exports = mongoose.model('Product', productSchema);
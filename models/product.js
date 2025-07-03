const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price must be specified"],
  },
  featured: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,

    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    //['ikea', 'liddy', 'caressa', 'macros'],
  },
});
module.exports = mongoose.model("Products", productsSchema);

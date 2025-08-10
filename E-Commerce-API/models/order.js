const mongoose = require("mongoose");
const product = require("./product");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
      totalPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
      paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid",
      },
      shippingAddress: {
        street: String,
        city: String,
        postalCode: String,
        country: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

module.exports = mongoose.model("Order", orderSchema);

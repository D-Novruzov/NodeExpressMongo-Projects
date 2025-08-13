
const express = require("express");
const { stripe } = require("../stripe");
const Order = require("../models/order");

const router = express.Router();
require("dotenv").config();


router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log("Webhook verified, event type:", event.type);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Session metadata:", session.metadata);
      
      try {
        const result = await Order.findByIdAndUpdate(
          session.metadata.orderId,
          { paymentStatus: "paid" },
          { new: true }
        );
        if (!result) {
          console.error("Order not found for ID:", session.metadata.orderId);
        } else {
          console.log("Order updated successfully:", result);
        }
      } catch (err) {
        console.error("Error updating order:", err);
      }
    }
    
    res.json({ received: true });
  }
);


module.exports = router;
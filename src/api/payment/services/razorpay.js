"use strict";
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = {
  createOrder: async (amount) => {
    try {
      const options = {
        amount: amount * 100, // Razorpay takes paise (₹1 = 100 paise)
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      };
      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create Razorpay order");
    }
  },
};

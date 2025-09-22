const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = {
  async createOrder(ctx) {
    try {
      const { items } = ctx.request.body;

      // Calculate total amount
      let total = 0;
      items.forEach((item) => {
        total += item.price * item.quantity;
      });

      console.log("🛒 Cart Total (in rupees):", total);

      const options = {
        amount: total * 100, // already in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      return order;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};

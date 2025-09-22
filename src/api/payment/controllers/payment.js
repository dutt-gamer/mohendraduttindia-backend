const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       // ✅ Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // ✅ Secret
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
        amount: total * 100, // amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      // ✅ Send order + key to frontend
      ctx.send({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID, // only Key ID, secret stays hidden
      });
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
};

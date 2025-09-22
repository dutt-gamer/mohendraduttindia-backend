module.exports = {
  routes: [
    {
      method: 'POST',  // 👈 allow POST instead of GET
      path: '/payment/order',
      handler: 'payment.createOrder',
      config: {
        auth: false, // 👈 disable auth if not using user login
      },
    },
  ],
};

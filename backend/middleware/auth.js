const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const clerkMiddleware = ClerkExpressWithAuth({
  apiKey: 'pk_test_bmF0dXJhbC1idWxsZnJvZy05My5jbGVyay5hY2NvdW50cy5kZXYk',
  secretKey: 'sk_test_fjO2jbHw8Z42kCN0ypWBezRmTxPiRrOut9C2eJbCAJ',
});

module.exports = { clerkMiddleware };

